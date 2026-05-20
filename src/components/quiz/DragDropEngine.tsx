import { useState, useRef, useCallback, useEffect } from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useQuizStrings, type QuizStringKey } from './QuizStrings';
import type { DragDropQuestion, MatchQuestion } from './types';

interface DragDropEngineProps {
  question: DragDropQuestion | MatchQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations?: boolean;
}

export default function DragDropEngine({ question, onAnswer, showExplanations = true }: DragDropEngineProps) {
  const { qs } = useQuizStrings();

  if (question.type === 'dragDrop') {
    return (
      <DragDropQuestionView
        question={question}
        onAnswer={onAnswer}
        showExplanations={showExplanations}
        qs={qs}
      />
    );
  }

  return (
    <MatchQuestionView
      question={question}
      onAnswer={onAnswer}
      showExplanations={showExplanations}
      qs={qs}
    />
  );
}

// ─── Drag & Drop: Sort items into categories ───

function DragDropQuestionView({
  question,
  onAnswer,
  showExplanations,
  qs,
}: {
  question: DragDropQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations: boolean;
  qs: (key: QuizStringKey, replacements?: Record<string, string | number>) => string;
}) {
  const [placements, setPlacements] = useState<Record<string, string | null>>(() => {
    const initial: Record<string, string | null> = {};
    question.items.forEach((item) => {
      initial[item.id] = null;
    });
    return initial;
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  // Touch drag state
  const [touchDragItem, setTouchDragItem] = useState<string | null>(null);
  const [touchPos, setTouchPos] = useState<{ x: number; y: number } | null>(null);
  const [touchOverCategory, setTouchOverCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const unplacedItems = question.items.filter((item) => !placements[item.id]);

  const handleDragStart = (itemId: string) => {
    if (submitted) return;
    setDraggedItem(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (categoryId: string) => {
    if (submitted || !draggedItem) return;
    setPlacements((prev) => ({ ...prev, [draggedItem]: categoryId }));
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleRemoveFromCategory = (itemId: string) => {
    if (submitted) return;
    setPlacements((prev) => ({ ...prev, [itemId]: null }));
  };

  // Touch drag handlers for mobile support
  const handleTouchStart = useCallback((itemId: string, e: React.TouchEvent) => {
    if (submitted) return;
    const touch = e.touches[0];
    setTouchDragItem(itemId);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  }, [submitted]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchDragItem) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });

    // Detect which category zone is under the finger
    const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    let foundCategory: string | null = null;
    if (elemBelow) {
      const catEl = elemBelow.closest('[data-category-id]');
      if (catEl) {
        foundCategory = catEl.getAttribute('data-category-id');
      }
    }
    setTouchOverCategory(foundCategory);
  }, [touchDragItem]);

  const handleTouchEnd = useCallback(() => {
    if (!touchDragItem) return;
    if (touchOverCategory && !submitted) {
      setPlacements((prev) => ({ ...prev, [touchDragItem]: touchOverCategory }));
    }
    setTouchDragItem(null);
    setTouchPos(null);
    setTouchOverCategory(null);
  }, [touchDragItem, touchOverCategory, submitted]);

  // Prevent page scroll during touch drag
  useEffect(() => {
    if (!touchDragItem) return;
    const preventScroll = (e: TouchEvent) => { e.preventDefault(); };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [touchDragItem]);

  const handleSubmit = () => {
    if (submitted) return;
    const allPlaced = Object.values(placements).every((v) => v !== null);
    if (!allPlaced) return;

    const newResults: Record<string, boolean> = {};
    Object.entries(placements).forEach(([itemId, categoryId]) => {
      newResults[itemId] = categoryId === question.correctMapping[itemId];
    });
    setResults(newResults);
    setSubmitted(true);

    const correctCount = Object.values(newResults).filter(Boolean).length;
    const total = question.items.length;
    const allCorrect = correctCount === total;

    const userSummary = question.items
      .map((item) => `${item.label} → ${question.categories.find((c) => c.id === placements[item.id])?.label || '?'}`)
      .join(', ');
    const correctSummary = question.items
      .map((item) => `${item.label} → ${question.categories.find((c) => c.id === question.correctMapping[item.id])?.label || '?'}`)
      .join(', ');

    onAnswer(allCorrect, userSummary, correctSummary);
  };

  return (
    <div>
      <p className="text-lg text-gray-200 mb-6 leading-relaxed">{question.question}</p>

      {/* Unplaced items pool */}
      {unplacedItems.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">{qs('dragItemsHere')}:</p>
          <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-xl bg-white/3 border border-dashed border-white/10">
            {unplacedItems.map((item) => (
              <div
                key={item.id}
                draggable={!submitted}
                onDragStart={() => handleDragStart(item.id)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(item.id, e)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'none' }}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium cursor-grab active:cursor-grabbing transition-all select-none',
                  (draggedItem === item.id || touchDragItem === item.id)
                    ? 'bg-brand-purple/30 border-brand-purple text-white scale-105'
                    : 'bg-brand-purple/10 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/20'
                )}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category zones */}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.categories.map((category) => {
          const categoryItems = question.items.filter((item) => placements[item.id] === category.id);
          const isDragOver = draggedItem !== null || touchDragItem !== null;
          const isTouchOver = touchOverCategory === category.id;

          return (
            <div
              key={category.id}
              data-category-id={category.id}
              ref={(el) => { categoryRefs.current[category.id] = el; }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(category.id)}
              className={cn(
                'rounded-xl border-2 border-dashed p-4 min-h-[100px] transition-all',
                isTouchOver && !submitted
                  ? 'border-brand-cyan/60 bg-brand-cyan/10 scale-[1.02]'
                  : isDragOver && !submitted
                    ? 'border-brand-purple/40 bg-brand-purple/5'
                    : 'border-white/10 bg-white/3'
              )}
            >
              <p className="text-sm font-semibold text-gray-300 mb-3">{category.label}</p>
              <div className="space-y-2">
                {categoryItems.map((item) => {
                  const isCorrect = submitted && results[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleRemoveFromCategory(item.id)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-all',
                        submitted
                          ? isCorrect
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-red-500/20 border border-red-500 text-red-400'
                          : 'bg-brand-purple/10 border border-brand-purple/20 text-white cursor-pointer hover:bg-brand-purple/20'
                      )}
                    >
                      <span>{item.label}</span>
                      {submitted && (isCorrect ? <Check size={14} /> : <X size={14} />)}
                    </div>
                  );
                })}
                {categoryItems.length === 0 && (
                  <p className="text-xs text-gray-500 italic">{qs('dropHere')}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {unplacedItems.length === 0 && !submitted && (
        <button
          onClick={handleSubmit}
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mt-4"
        >
          {qs('checkAllAnswers')} <ChevronRight size={16} />
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="mt-4 space-y-3">
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium',
              Object.values(results).every(Boolean)
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            )}
          >
            {Object.values(results).every(Boolean) ? <Check size={16} /> : <X size={16} />}
            {Object.values(results).filter(Boolean).length}/{question.items.length} {qs('correct').toLowerCase()}
          </div>

          {showExplanations && question.explanation && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-gray-300 text-sm">
                <strong className="text-brand-amber">{qs('why')} </strong>
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Floating touch drag clone */}
      {touchDragItem && touchPos && (
        <div
          style={{
            position: 'fixed',
            left: touchPos.x - 40,
            top: touchPos.y - 16,
            zIndex: 9999,
            pointerEvents: 'none',
            opacity: 0.9,
            transform: 'scale(1.1)',
          }}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-purple/30 border border-brand-purple text-white shadow-lg"
        >
          {question.items.find((i) => i.id === touchDragItem)?.label}
        </div>
      )}
    </div>
  );
}

// ─── Match the Following: Tap-to-connect pairs ───

function MatchQuestionView({
  question,
  onAnswer,
  showExplanations,
  qs,
}: {
  question: MatchQuestion;
  onAnswer: (correct: boolean, userAnswer: string, correctAnswer: string) => void;
  showExplanations: boolean;
  qs: (key: QuizStringKey, replacements?: Record<string, string | number>) => string;
}) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [connections, setConnections] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  // Shuffle right column indices
  const [shuffledRight] = useState(() => {
    const indices = question.pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const allMatched = Object.keys(connections).length === question.pairs.length;

  const handleLeftClick = (leftIdx: number) => {
    if (submitted) return;
    if (connections[leftIdx] !== undefined) {
      // Remove existing connection
      setConnections((prev) => {
        const next = { ...prev };
        delete next[leftIdx];
        return next;
      });
    }
    setSelectedLeft(leftIdx === selectedLeft ? null : leftIdx);
  };

  const handleRightClick = (rightIdx: number) => {
    if (submitted || selectedLeft === null) return;
    // Remove any existing connection to this right item
    const newConnections = { ...connections };
    Object.entries(newConnections).forEach(([left, right]) => {
      if (right === rightIdx) delete newConnections[Number(left)];
    });
    newConnections[selectedLeft] = rightIdx;
    setConnections(newConnections);
    setSelectedLeft(null);
  };

  const getRightValue = (rightDisplayIdx: number): string => {
    return question.pairs[shuffledRight[rightDisplayIdx]].right;
  };

  const handleSubmit = () => {
    if (!allMatched || submitted) return;
    setSubmitted(true);

    let correctCount = 0;
    Object.entries(connections).forEach(([leftIdx, rightIdx]) => {
      if (shuffledRight[rightIdx] === Number(leftIdx)) {
        correctCount++;
      }
    });

    const allCorrect = correctCount === question.pairs.length;
    const userSummary = question.pairs
      .map((pair, i) => {
        const rightIdx = connections[i];
        return `${pair.left} → ${rightIdx !== undefined ? getRightValue(rightIdx) : '?'}`;
      })
      .join(', ');
    const correctSummary = question.pairs.map((pair) => `${pair.left} → ${pair.right}`).join(', ');

    onAnswer(allCorrect, userSummary, correctSummary);
  };

  const isConnectionCorrect = (leftIdx: number): boolean => {
    const rightIdx = connections[leftIdx];
    if (rightIdx === undefined) return false;
    return shuffledRight[rightIdx] === leftIdx;
  };

  return (
    <div>
      <p className="text-lg text-gray-200 mb-2 leading-relaxed">{question.question}</p>
      <p className="text-sm text-gray-400 mb-6">{qs('tapToConnect')}</p>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-start">
        {/* Left column */}
        <div className="space-y-2">
          {question.pairs.map((pair, leftIdx) => {
            const isConnected = connections[leftIdx] !== undefined;
            const isSelected = selectedLeft === leftIdx;

            return (
              <button
                key={`left-${leftIdx}`}
                onClick={() => handleLeftClick(leftIdx)}
                disabled={submitted}
                className={cn(
                  'w-full p-3 rounded-xl text-start text-sm font-medium transition-all min-h-[44px] flex items-center',
                  submitted
                    ? isConnected
                      ? isConnectionCorrect(leftIdx)
                        ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                        : 'bg-red-500/20 border border-red-500 text-red-400'
                      : 'bg-white/5 border border-white/10 text-gray-400'
                    : isSelected
                      ? 'bg-brand-purple/20 border-2 border-brand-purple text-white'
                      : isConnected
                        ? 'bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan'
                        : 'bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10'
                )}
              >
                {pair.left}
              </button>
            );
          })}
        </div>

        {/* Connecting arrows */}
        <div className="flex flex-col items-center justify-center space-y-2 py-2">
          {question.pairs.map((_, leftIdx) => (
            <div key={`arrow-${leftIdx}`} className="h-[44px] flex items-center">
              {connections[leftIdx] !== undefined ? (
                <div
                  className={cn(
                    'w-6 h-0.5',
                    submitted
                      ? isConnectionCorrect(leftIdx)
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                      : 'bg-brand-cyan/50'
                  )}
                />
              ) : (
                <div className="w-6 h-0.5 bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {shuffledRight.map((originalIdx, displayIdx) => {
            const isConnected = Object.values(connections).includes(displayIdx);
            const isSelectedForConnection = selectedLeft !== null;

            return (
              <button
                key={`right-${displayIdx}`}
                onClick={() => handleRightClick(displayIdx)}
                disabled={submitted || !isSelectedForConnection}
                className={cn(
                  'w-full p-3 rounded-xl text-start text-sm font-medium transition-all min-h-[44px] flex items-center',
                  submitted
                    ? isConnected
                      ? Object.entries(connections).some(
                          ([left, right]) => right === displayIdx && isConnectionCorrect(Number(left))
                        )
                        ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                        : 'bg-red-500/20 border border-red-500 text-red-400'
                      : 'bg-white/5 border border-white/10 text-gray-400'
                    : isConnected
                      ? 'bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan'
                      : isSelectedForConnection
                        ? 'bg-white/5 border border-white/10 text-gray-200 hover:bg-brand-purple/10 hover:border-brand-purple/30 cursor-pointer'
                        : 'bg-white/5 border border-white/10 text-gray-200'
                )}
              >
                {question.pairs[originalIdx].right}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      {allMatched && !submitted && (
        <button
          onClick={handleSubmit}
          className="btn-primary px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2 mt-6"
        >
          {qs('checkAllAnswers')} <ChevronRight size={16} />
        </button>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="mt-4 space-y-3">
          {(() => {
            const correctCount = Object.entries(connections).filter(([left]) =>
              isConnectionCorrect(Number(left))
            ).length;
            return (
              <div
                className={cn(
                  'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium',
                  correctCount === question.pairs.length
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-red-500/10 text-red-400'
                )}
              >
                {correctCount === question.pairs.length ? <Check size={16} /> : <X size={16} />}
                {correctCount}/{question.pairs.length} {qs('correct').toLowerCase()}
              </div>
            );
          })()}

          {showExplanations && question.explanation && (
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-gray-300 text-sm">
                <strong className="text-brand-amber">{qs('why')} </strong>
                {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
