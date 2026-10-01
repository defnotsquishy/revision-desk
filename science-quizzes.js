// Quick recall uses explanations from other questions in the same topic as
// distractors. The full flashcard collection remains available in both tiers.
// Questions involving calculations, practical methods or open evaluations stay
// in Flashcards: those need written working, not recognition of a paragraph.
(() => {
  const subjects = window.FLASHCARD_DATA.subjects.filter(s => s.route);
  for (const subject of subjects) for (const deck of subject.decks) {
    const candidates = deck.cards.filter(c => /^What (is|are|does|do|happens|distinguishes|building)/.test(c.question) && !['Calculation','Required practical','Evaluation','Working scientifically'].some(tag=>c.tags.includes(tag)));
    for (const [i,card] of candidates.entries()) {
      const pool = [...new Set(candidates.filter(c => c.id !== card.id && c.tier === card.tier && c.answer !== card.answer).map(c=>c.answer))];
      if (pool.length < 3) continue;
      const others = Array.from({length:3},(_,n) => pool[(i+n)%pool.length]);
      if (new Set([card.answer,...others]).size !== 4) continue;
      card.quiz = {question:card.question,options:[card.answer,...others]};
    }
    if (deck.id.endsWith('-c3')) {
      const choices = {
        'What is relative formula mass, Mr?': ['The sum of the relative atomic masses of every atom in the formula','The number of neutrons in one atom','The mass of a solution divided by its volume','The total number of electron shells'],
        'What does a state symbol tell you?': ['Whether a substance is solid, liquid, gas or aqueous','The number of moles in the reaction','The temperature at which a reaction finishes','The relative atomic mass of each element'],
        'What is mass concentration?': ['Mass of solute divided by volume of solution','Volume of solution divided by mass of solute','Mass of solvent divided by mass of solute','Relative formula mass multiplied by temperature']
      };
      for (const card of deck.cards) if (choices[card.question]) card.quiz={question:card.question,options:choices[card.question]};
    }
  }
})();
