// Original four-option recall/application questions; correct answer is index 0.
// Checked 3 October 2026 against AQA Chemistry 8462 §§4.1–4.5 and
// Combined Science: Trilogy 8464 §§5.1–5.5, including Foundation/Triple scope.
// https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/subject-content
// https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/chemistry-subject-content
// Marking checks: AQA-84621F-MS-JUN23.PDF and AQA-8464C1F-MS-JUN23.PDF
// in https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2023/june/
// Load after expanded-cards.js. Only quiz metadata changes: existing card IDs,
// explanations, tags, tiers, source IDs and progress remain untouched.
(() => {
  'use strict';
  const decks = window.FLASHCARD_DATA.subjects.flatMap(subject => subject.decks);
  const banks = {};
  function bank(topic, text) {
    banks[topic] = text.trim().split('\n').map(line => {
      const [suffix, ...options] = line.split('|');
      if (options.length !== 4 || options.some(option => !option.trim()) || new Set(options).size !== 4) {
        throw new Error('Invalid Chemistry quiz choices: ' + topic + '-' + suffix);
      }
      return {suffix, options};
    });
    if (banks[topic].length !== 30) throw new Error('Chemistry quiz bank must contain 30: ' + topic);
  }

  bank('c1', `
01|A substance containing atoms with one proton number|A substance containing two chemically bonded elements|Any substance with no neutrons|Any substance with no electrons
02|Different elements chemically bonded in fixed proportions|Different substances mixed without bonding|One element containing several isotopes|A dissolved substance with a variable formula
03|Substances together without chemical bonding between them|Elements chemically bonded in fixed proportions|Atoms with an identical proton number|A substance that can only be separated chemically
04|An insoluble solid stays in the filter while liquid passes through|Dissolved salt is trapped while water passes through|A liquid vaporises and then condenses|Different liquids separate by their boiling points
05|To obtain crystals of a dissolved solid|To collect an insoluble solid without its liquid|To separate two gases by filtration|To change a compound into its elements
06|A solvent is evaporated and then condensed for collection|A dissolved solid passes through filter paper|A metal is chemically extracted from its oxide|An ink is separated into spots on paper
07|To separate liquids with different boiling points|To separate a dissolved solid using filter paper|To split a compound into individual elements|To separate isotopes by their neutron numbers
08|Components have different attractions to the mobile and stationary phases|Every component travels at the same speed|Components are separated only by their atomic numbers|The solvent changes each component into a new element
09|Pencil graphite does not dissolve in the solvent|Pencil graphite dissolves faster than the sample|Pencil graphite makes the paper impermeable|Pencil graphite converts ink into a single substance
10|Change coefficients while keeping chemical formulae unchanged|Change subscripts until the masses look similar|Add electrons to each compound's formula|Remove atoms from the products' formulae
11|Proton +1, neutron 0, electron −1|Proton −1, neutron 0, electron +1|Proton +1, neutron +1, electron 0|Proton 0, neutron −1, electron +1
12|Protons and neutrons each have relative mass 1; electrons are much lighter|All three particles have relative mass 1|Electrons have relative mass 1 and protons almost zero|Neutrons have no mass because they have no charge
13|The number of protons in the nucleus|The total number of protons and neutrons|The number of occupied electron shells|The number of neutrons minus electrons
14|The total number of protons and neutrons|The number of electrons in the outer shell|The number of protons minus neutrons|The number of neutrons alone
15|11 protons, 12 neutrons and 11 electrons|12 protons, 11 neutrons and 12 electrons|11 protons, 23 neutrons and 11 electrons|23 protons, 11 neutrons and 23 electrons
16|The same proton number but different neutron numbers|The same neutron number but different proton numbers|The same mass number but different elements|The same electron number but different proton numbers
19|35.5|36.0|35.0|37.0
20|2,8,1|2,7,2|2,8,8|2,9
21|Electrons were discovered, showing that atoms contained smaller particles|Neutrons were discovered in fixed shells|Most alpha particles bounced directly backwards|Atomic numbers were found to equal neutron numbers
22|Most atomic volume is empty space, with a small dense positive nucleus|Positive charge fills the atom uniformly|Electrons form the dense central nucleus|Alpha particles prove that atoms contain no charged particles
23|Bohr proposed fixed electron energy levels; Chadwick identified neutrons|Bohr discovered neutrons; Chadwick discovered electron shells|Both proposed that positive charge is spread uniformly|Bohr discovered protons; Chadwick discovered electrons
24|Increasing atomic number, with similar elements in vertical groups|Increasing neutron number, with identical masses in groups|Decreasing atomic number, with metals all on the right|Alphabetical order, with isotopes in separate groups
25|They have the same number of outer-shell electrons|They all have the same mass number|They all contain the same number of neutrons|They have the same number of occupied shells
26|To leave positions for predicted undiscovered elements|To reserve positions for compounds|To remove all elements with unusual atomic masses|To place noble gases between every two metals
27|Their outer electron shells are complete|They have no electrons|Their nuclei contain no protons|Their outer shells contain one electron
28|They increase down Group 0|They decrease down Group 0|They stay equal for all noble gases|They fall because the atoms lose their outer electrons
29|Sodium hydroxide and hydrogen|Sodium chloride and oxygen|Sodium oxide and carbon dioxide|Sodium carbonate and hydrogen
30|The outer electron becomes easier to lose as shielding and distance increase|The outer electron becomes harder to lose as shells are added|The atoms gain more outer-shell electrons down the group|The number of occupied shells decreases down the group
31|Greater shielding and distance weaken attraction for an incoming electron|The halogens lose one outer electron more easily down the group|The atoms have fewer occupied shells down the group|The outer shell becomes complete down the group
32|A more reactive halogen replaces a less reactive halogen in its salt|A less reactive halogen replaces a more reactive halogen|Any halogen replaces any other halogen at the same rate|Halogens displace metals from all metal salts
`);

  bank('c2', `
01|Electron transfer makes oppositely charged ions that attract|Atoms share one pair of electrons without forming ions|Positive ions are attracted only to other positive ions|Neutrons transfer between atoms to make charged particles
02|A +1 ion formed by losing one electron|A −1 ion formed by gaining one electron|A +2 ion formed by losing two electrons|A neutral atom formed by losing a proton
03|A −1 ion formed by gaining one electron|A +1 ion formed by losing one electron|A −2 ion formed by gaining two electrons|A neutral atom formed by gaining a neutron
04|A regular three-dimensional arrangement of oppositely charged ions|A collection of separate uncharged molecules|Layers of atoms held only by weak intermolecular forces|A structure of electrons with no positive particles
05|Strong attractions between oppositely charged ions require much energy to overcome|Weak attractions between separate molecules require little energy|The ions have no charge until they are heated|The ions are destroyed when the solid melts
06|Its ions are fixed and cannot carry charge through the solid|It contains no charged particles|It has freely moving electrons but no ions|Its ions all have the same charge
07|Its ions are free to move and carry charge|Its ions turn into mobile neutrons|Its electrons leave the nuclei and carry all the charge|Its molten particles are all uncharged molecules
08|A pair of electrons shared between atoms|An electron transferred from one atom to another|An attraction between two positive ions|A pair of neutrons shared between nuclei
09|H₂ one pair, O₂ two pairs and N₂ three pairs|H₂ two pairs, O₂ one pair and N₂ three pairs|H₂ one pair, O₂ three pairs and N₂ two pairs|All three molecules share only one pair
10|Different symbols show electron origins, with shared pairs in overlaps|Dots show protons and crosses show neutrons|Each cross represents a positive ion rather than an electron|Only inner-shell electrons are shown between the atoms
11|Weak intermolecular forces are overcome; covalent bonds remain intact|The covalent bonds inside every molecule are weak and break|All electrons are transferred to neighbouring molecules|The nuclei contain fewer protons when the substance boils
12|Larger similar molecules usually have stronger intermolecular attractions|Their covalent bonds necessarily become weaker|Their nuclei have less mass|Their intermolecular attractions disappear completely
13|They usually lack mobile ions and delocalised electrons|Their covalent bonds prevent any electrons existing|All of their particles carry the same positive charge|They conduct only because their molecules are large
14|A large molecule made from repeating units joined by covalent bonds|A giant ionic lattice made only from metal ions|A mixture of unrelated small molecules with no bonds|A single atom with many electron shells
15|An extensive network of atoms joined by covalent bonds|Separate small molecules held by weak forces|A regular array of positive and negative ions|Positive metal ions surrounded by mobile electrons
16|Each carbon forms four strong bonds in a rigid three-dimensional network|Each carbon forms one weak bond in separate small molecules|Its positive ions are attracted to negative ions|Its layers slide because there are no bonds between atoms
17|Its outer electrons are used in bonds, with no mobile charge carriers|It has no electrons at all|It contains mobile positive and negative ions|Its delocalised electrons can move freely
18|Three covalent bonds per carbon in hexagonal layers, with one delocalised electron|Four covalent bonds per carbon in a three-dimensional network|Two ionic bonds per carbon between alternating charged layers|One covalent bond per carbon in separate molecules
19|Delocalised electrons carry charge through the structure|Positive and negative carbon ions move through the solid|The layers turn into uncharged molecules|Neutrons move between layers and carry charge
20|Weak attractions between layers let the layers slide|All covalent bonds in each layer are weak|Each carbon ion is free to move through the solid|The layers are joined by four bonds per carbon
21|One atom-thick layer of graphite|A three-dimensional lattice of carbon ions|A spherical molecule containing exactly two carbons|A mixture of diamond and a metal
22|Carbon molecules with hollow shapes, including spherical C₆₀|Solid metal particles mixed with carbon|Carbon ions arranged in an ionic lattice|Single isolated carbon atoms with full outer shells
23|Strong, conducting structures used in composites and electronics|Soft, non-conducting crystals used only as lubricants|Soluble ionic compounds used to neutralise acids|Weak gases used because they cannot carry charge
24|Attraction between positive metal ions and delocalised electrons|Attraction between positive and negative metal ions|Pairs of electrons shared in separate small molecules|Attraction between neutrons and outer electron shells
25|Delocalised electrons can move and carry charge|Metal ions flow through the solid wire|Neutrons move freely along the wire|The metal melts whenever current passes
26|Layers can slide while metallic bonding continues to hold them together|The atoms shrink permanently when force is applied|All bonds must break before any bending can occur|The metal becomes an ionic solution when bent
27|Different-sized atoms distort layers and make sliding harder|Alloy atoms are identical in size and slide more easily|Alloys contain no delocalised electrons|Alloys are harder because every atom gains a full outer shell
28|A mixture of elements containing at least one metal|A pure metal containing only one isotope|A compound containing only non-metal elements|A dissolved ionic salt with no metal atoms
29|Solids vibrate in fixed positions; liquids flow; gases are widely separated|Solid particles are motionless; liquid particles are far apart|Gas particles occupy fixed positions and only vibrate|Liquid particles have no movement and no gaps
30|Dissolved in water|A pure liquid that contains no water|A solid under the reaction conditions|A gas dissolved only in another gas
`);

  bank('c3', `
01|Atoms are rearranged, not created or destroyed|Atoms are created to replace energy lost|Every product has the same formula as its reactant|Reactants lose mass because atoms become heat
02|Oxygen from the air becomes part of the magnesium oxide|The magnesium creates new atoms as it burns|The balance gains mass from thermal energy alone|The magnesium changes its proton number
03|Carbon dioxide leaves the open container|Carbon atoms are destroyed by the acid|The products have no mass|The gas changes into energy with no particles left
04|The sum of the relative atomic masses of all atoms in the formula|The number of neutrons in one atom|The volume occupied by one molecule|The number of electron shells in the substance
05|18|17|32|34
06|100|68|88|148
07|58|41|50|82
08|The element's mass contribution divided by compound Mr, multiplied by 100|Compound Mr divided by the element's mass contribution, multiplied by 100|The number of elements divided by total atom number, multiplied by 100|The number of neutrons divided by atomic number, multiplied by 100
09|48%|16%|32%|40%
10|Use the spread around the mean; half the range when that method is requested|Assume every repeat reading has zero uncertainty|Use the largest reading as the uncertainty without comparison|Subtract the number of repeats from their mean
11|It reduces the influence of random variation|It guarantees that systematic errors disappear|It makes every individual reading more precise|It changes an incorrect instrument calibration automatically
12|Whether the substance is solid, liquid, gas or dissolved in water|The number of electrons shared in a bond|The number of moles in the reaction|The relative mass of each nucleus
13|2H₂ + O₂ → 2H₂O|H₂ + O₂ → H₂O|H₂ + O₂ → H₂O₂|2H₂ + 2O₂ → 2H₂O
14|CH₄ + 2O₂ → CO₂ + 2H₂O|CH₄ + O₂ → CO₂ + H₂O|CH₄ + 2O₂ → 2CO₂ + H₂O|2CH₄ + O₂ → CO₂ + 2H₂O
15|It multiplies the numbers of every atom in the formula|It changes only the last element in the formula|It changes the substance's chemical identity|It changes only the number of neutrons
16|Mass of dissolved solute per volume of solution, such as g/dm³|Mass of solvent per mass of solute, expressed in grams|The relative formula mass alone, expressed in dm³|The number of electron shells per litre
17|Divide by 1000|Multiply by 1000|Divide by 100|Multiply by 100
19|6 g|24 g|0.042 g|12.5 g
extension-01|44|28|40|56
extension-02|58.5|35.5|23|81.5
extension-03|98|49|66|130
extension-04|74|57|42|114
extension-05|Approximately 11.1%|Approximately 5.6%|Approximately 88.9%|Approximately 18.0%
extension-06|Approximately 27.3%|Approximately 72.7%|Approximately 12.0%|Approximately 54.5%
extension-07|20 g|12 g|8 g|4 g
extension-08|It prevents unnoticed gas escape or entry from changing the measured total|It makes atoms gain mass during reaction|It stops all chemical reactions taking place|It removes the need to include any gases in the total
extension-09|5.0 g|15.0 g|0.4 g|5.2 g
extension-10|±0.2 g|±0.4 g|±5.0 g|±0.1 g
extension-11|An unusual value can pull the mean away from typical readings|A mean always equals every individual reading|Anomalies automatically prove the theory is wrong|Every repeat reading should be kept only if it equals the prediction
extension-12|Chemical reactions do not turn one element's atoms into another's|Elements disappear if their compounds produce gas|Only the total number of electrons must be conserved|Products always contain the same molecules as reactants
`);

  bank('c4', `
01|Gain of oxygen|Loss of oxygen|Gain of hydrogen in every reaction|Loss of all neutrons
02|Loss of oxygen|Gain of oxygen|Loss of mass in every reaction|Gain of all protons
03|Metals' tendency to react and form positive ions|Metals' alphabetical names|Only metals' melting points|Only metals' atomic masses
04|A more reactive metal replaces a less reactive metal in its compound|Any metal replaces any other metal|A less reactive metal replaces a more reactive metal|A metal changes another element's proton number
05|It removes oxygen from oxides of metals less reactive than carbon|It extracts every metal regardless of reactivity|It melts oxides without causing any chemical change|It adds oxygen to the metal and produces a purer oxide
06|Aluminium is more reactive than carbon, so carbon reduction is unsuitable|Aluminium is less reactive than gold|Aluminium oxide contains no oxygen|Aluminium can only exist as an uncharged solution
07|They react little and may remain as the element|They are always more reactive than potassium|They cannot form atoms|Their ores contain only oxygen and no metal
08|A salt and hydrogen|A salt and oxygen|A salt, water and carbon dioxide|Only water
09|Salt and water|Salt and hydrogen|Salt and oxygen|Salt, water and carbon dioxide
10|Salt, water and carbon dioxide|Salt and hydrogen only|Salt and water only|Metal and oxygen
11|A base that dissolves in water|Any substance with pH below 7|Every insoluble metal oxide|A salt that contains no ions
12|Acids produce H⁺; alkalis produce OH⁻|Acids produce OH⁻; alkalis produce H⁺|Both produce only electrons|Acids produce neutrons; alkalis produce protons
13|Acidic below 7, neutral at 7 and alkaline above 7|Alkaline below 7 and acidic above 7|Neutral at 0 and acidic at 14|A measure of the mass number of hydrogen
14|React warm acid with excess oxide, filter, concentrate and cool to crystallise|Filter the acid first, then boil the oxide to dryness|Use electrolysis to deposit sulfate from solid copper oxide|Add indicator and collect it as the salt
15|To use up all the acid before removing the extra solid|To make the final salt solution strongly acidic|To dissolve every piece of solid in excess acid|To remove all sulfate ions from the solution
16|Concentrating then cooling forms crystals with less overheating or decomposition risk|Complete evaporation always turns the salt into a metal|A salt cannot crystallise if any water remains|Cooling removes all the ions from the salt
17|A liquid or solution containing mobile ions that carry charge|A solid ionic compound whose ions cannot move|An uncharged gas that carries charge by neutron movement|Any liquid, even without mobile charge carriers
18|Electric current decomposes an electrolyte; ions move to opposite-charge electrodes|It separates mixtures only by boiling point|It makes positive ions move to the positive anode|It turns every electrolyte into an uncharged solid
19|Lead at the cathode, bromine at the anode|Bromine at the cathode, lead at the anode|Hydrogen at the cathode, oxygen at the anode|Lead at both electrodes
20|It lowers the melting temperature and reduces energy demand|It raises the melting temperature to increase energy demand|It replaces aluminium ions with sodium atoms|It stops the molten electrolyte conducting
21|Oxygen reacts with the hot carbon to form carbon dioxide|Aluminium ions turn directly into carbon atoms|Carbon dissolves to form hydrogen gas|The anode gains mass because bromine forms
22|Hydrogen|Sodium|Chlorine|Oxygen
23|Chlorine|Hydrogen|Sodium|Nitrogen
24|Copper|Hydrogen|Sulfur|Oxygen
25|Oxygen|Copper|Hydrogen|Chlorine
26|Keep voltage, electrodes, spacing and solution conditions consistent|Change voltage and concentration together in every trial|Use a different electrode material for every solution without recording it|Compare different volumes without controlling any other factor
extension-01|Magnesium chloride|Magnesium sulfate|Magnesium nitrate|Magnesium carbonate
extension-02|Copper sulfate|Copper chloride|Copper nitrate|Copper carbonate
extension-04|Pass it through limewater; a milky result indicates carbon dioxide|Use a glowing splint; carbon dioxide relights it|Use a lighted splint; carbon dioxide gives a squeaky pop|Use universal indicator; a purple result identifies carbon dioxide uniquely
extension-05|A lighted splint gives a squeaky pop|A glowing splint relights|It turns limewater milky|It turns dry blue litmus paper red then bleaches it
`);

  bank('c5', `
01|A reaction transferring energy to the surroundings|A reaction taking energy from the surroundings|A reaction creating new energy|A reaction with no activation-energy barrier
02|A reaction taking energy from the surroundings|A reaction transferring energy to the surroundings|A reaction destroying energy permanently|A reaction that must produce a gas
03|Exothermic: energy is transferred to the surroundings|Endothermic: energy is taken from the surroundings|Neither: combustion has no energy transfer|Both at once because all fuels are liquids
04|Exothermic: the reacting solution usually warms|Endothermic: the reacting solution must cool|Neither: neutralisation transfers no energy|Endothermic because a salt always contains less energy
05|Endothermic: energy is supplied to decompose the compound|Exothermic: decomposition always warms its surroundings|Neither: heating cannot cause chemical change|Exothermic because heat must be supplied continuously
06|An exothermic process transfers energy to the hands|An endothermic process takes energy from the hands|The chemicals create energy from nothing|The hand warmer removes all activation energy from skin
07|An endothermic process absorbs energy from the surroundings|An exothermic process releases energy into the injury|The pack destroys the surroundings' thermal energy|The pack works only by producing hydrogen gas
08|The chemicals' energy change is balanced by a transfer to or from surroundings|Exothermic reactions create more total energy|Endothermic reactions destroy total energy|Every reaction leaves both chemicals and surroundings unchanged
09|The minimum energy colliding particles need for a successful reaction|The total energy of the products in every reaction|The temperature at which a liquid boils|The difference in mass between reactants and products
10|Energy vertically and reaction progress horizontally|Temperature vertically and time horizontally|Mass vertically and temperature horizontally|Reaction progress vertically and energy horizontally
11|The products are at a lower energy level than the reactants|The products are at a higher energy level than the reactants|The peak is lower than both reactants and products|The products always have zero energy
12|The products are at a higher energy level than the reactants|The products are at a lower energy level than the reactants|The reaction has no peak or energy barrier|The reactants and products must have identical energy levels
13|The energy difference from the reactants to the peak|The energy difference from reactants to products|The height of the products above the horizontal axis|The distance along the reaction-progress axis
14|The difference between reactant and product energy levels|The difference between the reactant level and the peak|The width of the curve on the horizontal axis|The peak height measured from zero in every diagram
15|It lowers activation energy without changing overall energy change|It lowers the product energy only|It raises the reactant energy permanently|It removes the products from the energy diagram
16|The change from initial to maximum or minimum mixture temperature|Only the room's temperature before mixing|The mass number of each reactant|Only the time until the reaction stops
17|To reduce unwanted energy exchange with the room|To prevent the reacting particles colliding|To increase heat loss through the container|To make every exothermic reaction endothermic
18|To reduce energy loss and evaporation while keeping measurement safe|To stop all particles moving in the mixture|To turn the solution into a gas|To seal any gas-producing reaction completely, regardless of pressure
19|To spread reactants and thermal energy through the mixture|To destroy the reaction's activation energy|To stop the thermometer absorbing any energy|To guarantee that all systematic errors disappear
20|Control volumes, starting temperatures, container and other relevant conditions|Change every reactant concentration and volume at once|Use different starting temperatures for each trial|Use a different container and stirring method each time
21|Later exchange with the room can reduce the measured change|Later readings always give the largest change|Temperature cannot change after a reaction|The thermometer becomes more precise as the mixture cools
22|They reveal variation and allow a mean, but systematic heat loss may remain|They automatically prevent all heat loss|They guarantee every reading is correct|They remove the need to control variables
23|+8°C|−8°C|+48°C|+20°C
24|−6°C|+6°C|+38°C|−16°C
25|Different baselines and energy exchange make changes less comparable|Starting temperature never affects a temperature measurement|Higher starting temperature always proves a reaction is more exothermic|Different baselines guarantee equal reaction energy transfers
26|Energy also warms apparatus or exchanges with air rather than all heating the solution|Energy is destroyed when the solution is stirred|A thermometer removes all the products from the reaction|The reacting atoms permanently lose mass
extension-03|An initial activation-energy barrier must still be overcome|An exothermic reaction cannot continue after ignition|Fuel must first become an element with fewer protons|Ignition supplies all the energy later released by the fuel
extension-06|A lower peak with unchanged reactant and product levels|A higher peak and unchanged product level|A lower product level with an unchanged peak|The same peak but no reactant energy level
extension-15|6.5°C|43.5°C|−6.5°C|7.5°C
extension-17|5.2°C|15.6°C|5.4°C|0.4°C
`);

  // Replace a few shared questions with relevant Chemistry-only content. These
  // replacements are not Higher-only; the remaining Higher cards stay available
  // in Flashcards without leaking into Foundation multiple choice.
  const tripleReplacements = {
    c1: {
      '06': {suffix:'33', options:['Usually harder, denser and less reactive than Group 1 metals','Always softer and less dense than Group 1 metals','They all react with water more vigorously than potassium','They all have lower melting points than Group 1 metals']},
      '09': {suffix:'34', options:['Coloured compounds, variable ion charges and catalytic uses','Only colourless compounds and exactly one possible ion charge','No metallic bonding and no ability to conduct','A full outer electron shell in every atom']}
    },
    c2: {
      '09': {suffix:'32', options:['About 1–100 nm','About 1–100 mm','About 1–100 cm','About 1–100 m']},
      '10': {suffix:'33', options:['A large surface-area-to-volume ratio exposes many reaction sites','Their small size means they have no surface area','They always increase activation energy','Their atoms are larger than atoms in the bulk material']},
      '28': {suffix:'34', options:['Weigh useful properties against exposure and uncertain long-term risks','Assume every nanoparticle is safe because it is small','Assume every nanoparticle is harmful regardless of evidence','Consider benefits but ignore possible exposure']}
    },
    c3: {
      'extension-05': {suffix:'33', options:['Desired-product Mr, including coefficients, divided by total-product Mr, times 100','Actual product mass divided by theoretical product mass, times 100','Total-product Mr divided by desired-product Mr, times 100','Solvent mass divided by solution volume, times 100']},
      'extension-11': {suffix:'31', options:['Actual yield divided by theoretical yield, multiplied by 100','Theoretical yield divided by actual yield, multiplied by 100','Desired-product Mr divided by total-reactant Mr, multiplied by 100','Reactant mass divided by solution volume, multiplied by 100']},
      'extension-12': {suffix:'32', options:['Product may be lost, reaction may be incomplete or side reactions may occur','Atoms are normally destroyed during the reaction','Every balanced reaction must give exactly 100% yield','Theoretical product mass is always smaller than actual product mass']}
    },
    c4: {
      'extension-01': {suffix:'34', options:['Both reactants are soluble, so titration finds amounts without a filterable excess','An alkali is always insoluble, so it can be filtered out','Titration converts a salt into a pure metal','An acid and alkali never react unless indicator is present']},
      'extension-02': {suffix:'35', options:['Pipette a known volume, add from a burette dropwise near the endpoint, and repeat','Use a beaker estimate and stop after the first rough attempt','Pour all titrant in at once and avoid swirling','Choose only the largest titre and ignore the other readings']}
    },
    c5: {
      'extension-03': {suffix:'33', options:['Different electrodes in an electrolyte undergo chemical reactions that drive charge movement','Two identical dry insulating blocks create a current without chemical change','The electrolyte supplies electricity by neutron flow','The cell produces energy without using any chemical store']},
      'extension-06': {suffix:'34', options:['An external current can reverse the reactions in a rechargeable cell','Every non-rechargeable cell can be recharged safely by heating','Rechargeable cells never use up reactants','Non-rechargeable cells work indefinitely without any reaction']},
      'extension-15': {suffix:'35', options:['Two or more cells connected together','One electrolyte ion with two electrons','A single electrode without an electrolyte','A device that stores only gravitational energy']},
      'extension-17': {suffix:'36', options:['Hydrogen + oxygen → water','Hydrogen + carbon dioxide → oxygen','Water + nitrogen → hydrogen','Hydrogen + oxygen → carbon dioxide']},
      '22': {suffix:'37', options:['Consider water at point of use plus hydrogen production, storage, cost and safety','Assume hydrogen needs no energy to produce and has no storage risks','Judge only the colour of the fuel-cell casing','Assume all fuel cells produce carbon dioxide at their electrodes']}
    }
  };

  for (const route of ['combined', 'triple']) for (const topic of Object.keys(banks)) {
    const deck = decks.find(item => item.id === route + '-' + topic);
    if (!deck) throw new Error('Missing Chemistry deck: ' + route + '-' + topic);
    // Retire automatic paragraph distractors, not the cards or their progress.
    for (const card of deck.cards) delete card.quiz;
    for (const original of banks[topic]) {
      const row = route === 'triple' ? (tripleReplacements[topic][original.suffix] || original) : original;
      const card = deck.cards.find(item => item.id === deck.id + '-' + row.suffix);
      if (!card || card.tier === 'H') throw new Error('Invalid Foundation Chemistry selection: ' + deck.id + '-' + row.suffix);
      if (row.options.length !== 4 || new Set(row.options).size !== 4) throw new Error('Duplicate Chemistry options: ' + card.id);
      card.quiz = {question:card.question, options:[...row.options]};
    }
    if (deck.cards.filter(card => card.quiz).length !== 30) throw new Error('Chemistry quiz count mismatch: ' + deck.id);
  }
})();
