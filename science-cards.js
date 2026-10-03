// Original revision explanations, checked against the supplied school organisers
// and AQA 8464/8461/8462/8463. Shared knowledge is cloned into separate courses;
// stable course-prefixed IDs keep their ratings independent.
(() => {
  'use strict';
  const topics = [];
  function topic(id, title, subject, sources, rows) {
    topics.push({id,title,subject,sources,rows:rows.trim().split('\n').map(line => {
      const [question, answer, focus, scope = ''] = line.split('|');
      return {question,answer,focus,scope};
    })});
  }
  topic('b1','B1 · Cell biology','Biology',[2,4],`
What distinguishes a eukaryotic cell from a prokaryotic cell?|Eukaryotic cells have genetic material enclosed in a nucleus. Bacterial cells are prokaryotic: their DNA is not enclosed in a nucleus.|Cell structure
What is the function of the nucleus?|The nucleus contains genetic material and controls the activities of the cell.|Cell structure
What happens in the cytoplasm?|Many chemical reactions occur in the cytoplasm. It is not the same structure as the cell membrane.|Cell structure
What does the cell membrane do?|It controls movement of substances into and out of the cell. It is present in both plant and animal cells.|Cell structure
What are mitochondria used for?|They are the site of most aerobic respiration, transferring energy for the cell's activities.|Cell structure
What is the function of ribosomes?|Ribosomes are the site of protein synthesis. They join amino acids to make proteins.|Cell structure
What is the plant cell wall made of?|Cellulose. It strengthens and supports the cell; animal cells do not have this wall.|Cell structure
What do chloroplasts do?|They contain chlorophyll, which absorbs light for photosynthesis. Not all plant cells contain chloroplasts, for example many root cells.|Cell structure
What does a permanent vacuole contain?|Cell sap. The vacuole helps maintain pressure against the cell wall, supporting a plant cell.|Cell structure
Where is bacterial genetic material found?|A circular DNA loop lies in the cytoplasm, outside a nucleus. Additional small DNA rings called plasmids may be present.|Cell structure
How is a sperm cell adapted to its function?|A tail enables swimming, mitochondria supply energy and enzymes in the acrosome help it penetrate the egg. Link each structure to fertilisation.|Specialisation
How is a nerve cell adapted to its function?|A long axon carries electrical impulses over distances. Branched connections link to other cells and insulation supports rapid transmission.|Specialisation
Why do muscle cells contain many mitochondria?|Contraction needs energy. Many mitochondria support the aerobic respiration that transfers this energy.|Specialisation
How is a root hair cell adapted for absorption?|Its long projection provides a large surface area. Water enters by osmosis and mineral ions can be taken up by active transport.|Specialisation
What is cell differentiation?|A cell develops specialised structures suited to a particular function. Most animal cells differentiate early, while many plant cells can do so throughout life.|Specialisation
What is magnification?|Image size divided by actual size. Convert both sizes to the same unit before dividing; magnification has no unit.|Microscopy
An image is 20 mm wide and the cell is 0.05 mm wide. What is the magnification?|20 ÷ 0.05 = 400, so the image is magnified ×400. Using the same units avoids a thousand-fold error.|Calculation
How many micrometres are in one millimetre?|1000 µm = 1 mm. To convert mm to µm multiply by 1000; to convert µm to mm divide by 1000.|Units
What is resolution in microscopy?|The ability to distinguish two nearby points as separate. Higher resolution reveals finer detail; enlarging a blurred image alone does not improve resolution.|Microscopy
Why can electron microscopes show finer detail?|They have higher resolving power and magnification than light microscopes, allowing smaller sub-cellular structures to be studied.|Microscopy
How do you prepare and observe an onion-cell slide?|Place a thin sample on a slide, add a suitable stain such as iodine, lower a coverslip without trapping air and focus at low power before increasing magnification. Draw clear labelled observations and include scale.|Required practical
What are chromosomes?|Long DNA molecules carrying many genes. Chromosomes in most body cells occur in pairs.|Cell division
What happens before mitosis in the cell cycle?|The cell grows, increases sub-cellular structures and replicates its DNA, producing two copies of each chromosome.|Cell division
What does mitosis produce?|Two genetically identical daughter cells with the same chromosome number as the parent cell. After nuclear division, the cytoplasm and membrane divide.|Cell division
Why is mitosis important?|It enables growth and the repair and replacement of cells in multicellular organisms. It is not the division that creates gametes.|Cell division
What is a stem cell?|An undifferentiated cell that can divide to produce more stem cells and differentiate into specialised cells.|Stem cells
How do embryonic and adult stem cells differ?|Embryonic stem cells can form most types of human cell. Adult bone-marrow stem cells can form a more limited range, including blood cells.|Stem cells
What are the benefits and risks of stem-cell treatment?|It could replace damaged cells, for example in diabetes or paralysis. Risks include infection and uncontrolled growth; use of embryos raises ethical objections. It is a potential treatment, not a guaranteed cure.|Evaluation
What is diffusion?|The net movement of particles from higher to lower concentration. A larger concentration gradient, higher temperature and larger surface area increase its rate.|Transport
What is osmosis?|The net diffusion of water from a dilute solution to a more concentrated solution through a partially permeable membrane.|Transport
What is active transport?|Movement of substances against their concentration gradient, from lower to higher concentration, using energy transferred by respiration.|Transport
Why do large organisms need specialised exchange surfaces?|Their surface-area-to-volume ratio is smaller, so the outer surface alone cannot meet demand. Large area, thin barriers, good blood supply and ventilation can speed exchange.|Transport
How does the potato osmosis practical control variables?|Use equal-sized pieces, equal solution volumes, the same time and temperature, and a range of concentrations. Blot dry before weighing, repeat and compare percentage mass changes.|Required practical
How do you calculate percentage change in mass?|((Final mass − initial mass) ÷ initial mass) × 100. A gain gives a positive value; a loss is negative. The zero-change concentration suggests no net osmosis.|Calculation
What is therapeutic cloning intended to achieve?|An embryo with the patient's genes supplies matching stem cells, reducing the chance of rejection. Ethical concerns and medical risks still need evaluation.|Stem cells
Why are plant meristems useful for cloning?|Their stem cells can differentiate into plant cell types throughout life. Cloning can conserve rare plants or multiply crops with useful characteristics.|Stem cells
How do bacteria reproduce in suitable conditions?|By binary fission. Each division doubles the population, so population = starting number × 2 raised to the number of divisions.|Culturing|T
Why are school bacterial cultures incubated at no more than 25°C?|This reduces the chance of growing dangerous human pathogens. Media and equipment must be sterilised, and plates kept closed with tape and inverted.|Culturing|T
How is an antibiotic's effect compared on agar plates?|Use evenly inoculated agar, discs with the test substances and a sterile-water control. After supervised incubation compare clear inhibition zones, controlling conditions and repeating.|Required practical|T
How do you calculate an inhibition-zone area?|Area = πr², using the radius, not the diameter. If radius is 3 mm, the area is about 28.3 mm². Larger zones under controlled conditions suggest greater inhibition.|Calculation|T
Why are culture plates not taped completely shut?|Small strips hold the lid in place but allow oxygen to enter, reducing growth of harmful anaerobic organisms. Inversion stops condensation dripping onto the agar.|Culturing|T
Eight bacteria divide every 20 minutes. How many after one hour?|Three divisions occur, so 8 × 2³ = 64 bacteria, assuming all survive and conditions remain suitable. Standard-form answers may be required on Higher.|Calculation|T
`);
  topic('b2','B2 · Organisation','Biology',[3,4],`
What is the order of biological organisation?|Cells → tissues → organs → organ systems → organism. Each level contains interacting parts from the level below.|Organisation
What is a tissue?|A group of cells with a similar structure and function, working together. Different tissues can contribute to the same organ.|Organisation
Why is the stomach an organ?|It contains different tissues working together, including muscle tissue and glandular tissue, to perform digestion.|Organisation
Why are digestive enzymes needed?|They break large insoluble food molecules into smaller soluble molecules that can be absorbed into the blood.|Digestion
What is an enzyme?|A biological catalyst: it speeds a reaction without being used up. Its active site has a specific shape for its substrate.|Enzymes
Why does high temperature reduce enzyme activity?|The enzyme denatures: its active-site shape changes so the substrate no longer fits. Do not say the enzyme is killed.|Enzymes
Why can enzyme activity rise as temperature first increases?|Particles have more kinetic energy, causing more successful collisions. Beyond the optimum, denaturation lowers the rate.|Enzymes
How does pH affect an enzyme?|Each enzyme has an optimum pH. Large deviations can change the active-site shape and reduce activity or denature it.|Enzymes
What does amylase break down?|Starch into sugars. It is a carbohydrase produced in salivary glands, the pancreas and the small intestine.|Digestion
What do proteases break down?|Proteins into amino acids. Proteases are produced in the stomach, pancreas and small intestine.|Digestion
What do lipases break down?|Lipids into fatty acids and glycerol. Lipases are produced in the pancreas and small intestine.|Digestion
Where is bile made and stored?|Made in the liver and stored in the gall bladder. It is released into the small intestine.|Digestion
How does bile help lipase?|It neutralises stomach acid and emulsifies fat into small droplets, increasing surface area. Bile is not an enzyme and does not chemically digest fat.|Digestion
What is a positive starch test?|Iodine changes from orange-brown to blue-black. Record the actual colour change, not only positive.|Food tests
What is a positive reducing-sugar test?|Benedict's reagent is heated with the sample in a hot-water bath. A positive result changes from blue towards green, yellow, orange or brick-red.|Food tests
What is a positive protein test?|Biuret reagent gives a lilac or purple colour with protein, compared with blue for a negative result.|Food tests
How can Sudan III detect lipids?|Shake the food sample with Sudan III solution. A stained red oil layer indicates lipid. Use the test specified by your school practical.|Food tests
How do you investigate the effect of pH on amylase?|Mix starch, amylase and a pH buffer at a controlled temperature. Sample into iodine at fixed intervals until it stays orange-brown. Repeat at other pHs and calculate rate as 1 ÷ time.|Required practical
Why use a water bath in the amylase practical?|It controls temperature, so changes in time to digest starch can be attributed to pH rather than a different temperature.|Required practical
What is a double circulatory system?|Blood passes through the heart twice per complete circuit: heart to lungs to heart, then heart to body to heart.|Circulation
What do the right and left ventricles do?|The right pumps blood to the lungs. The left pumps it around the body and has a thicker muscular wall to generate higher pressure.|Circulation
How does blood travel through the heart?|Body → vena cava → right atrium → right ventricle → pulmonary artery → lungs → pulmonary vein → left atrium → left ventricle → aorta → body.|Circulation
How do arteries differ from veins?|Arteries carry blood away from the heart and have thick muscular elastic walls. Veins carry blood towards the heart at lower pressure and have valves. Direction, not oxygen content, defines them.|Blood vessels
Why are capillary walls thin?|They are one cell thick, providing a short diffusion distance for exchange between blood and tissues.|Blood vessels
How are alveoli adapted for gas exchange?|They have a large surface area, thin moist walls, ventilation and a good capillary supply. These maintain rapid diffusion and concentration gradients.|Gas exchange
What do the four blood components do?|Red cells carry oxygen, white cells defend against pathogens, platelets help clotting and plasma transports cells and dissolved substances.|Blood
How are red blood cells adapted to carry oxygen?|Haemoglobin binds oxygen, the biconcave shape increases surface area and absence of a nucleus leaves more room for haemoglobin.|Blood
What causes coronary heart disease?|Fatty deposits narrow coronary arteries, reducing blood flow and oxygen supply to heart muscle. Reduced aerobic respiration can damage the muscle.|Health
How do stents and statins help coronary heart disease?|Stents hold narrowed arteries open; statins lower blood cholesterol and slow fatty deposit formation. Compare benefits, treatment risks and the patient's circumstances.|Health
What is the difference between benign and malignant tumours?|Benign tumours stay contained and do not invade tissues. Malignant tumours invade nearby tissue and may spread in blood to form secondary tumours.|Health
Why is a risk factor not proof that a disease will occur?|Risk factors increase probability. Diseases can involve several interacting factors, and a correlation alone does not establish a causal mechanism.|Health
How do xylem and phloem differ?|Xylem transports water and mineral ions through dead hollow lignified tubes. Phloem transports dissolved sugars through living elongated cells; this is translocation.|Plant transport
What is transpiration?|Loss of water vapour from a plant, mainly through leaf stomata. Evaporation and diffusion create the transpiration stream, drawing water up xylem.|Plant transport
Which conditions increase transpiration?|Higher temperature, greater air movement, lower humidity and greater light intensity generally increase water loss. Explain the effect on evaporation, gradients or stomatal opening.|Plant transport
What do guard cells do?|They change shape to open or close stomata, regulating gas exchange and water loss. Stomata are pores, not cells.|Plant tissues
How are palisade and spongy mesophyll adapted?|Palisade cells contain many chloroplasts near the upper surface. Spongy mesophyll has air spaces allowing gases to diffuse through the leaf.|Plant tissues
`);
  topic('b3','B3 · Infection & response','Biology',[5,4],`
What is a pathogen?|A microorganism that causes disease. Pathogen groups include bacteria, viruses, fungi and protists.|Pathogens
What is a communicable disease?|A disease caused by a pathogen that can spread between organisms. Non-communicable diseases are not passed between organisms in this way.|Pathogens
How can pathogens spread?|By air, water, direct contact, contaminated food or vectors. Prevention should target the specific route of transmission.|Transmission
How can bacteria make a person ill?|They multiply and may release toxins that damage tissues. Not all bacteria cause disease.|Pathogens
How do viruses cause harm?|They reproduce inside host cells and damage them. Viral replication uses the host's cell machinery.|Pathogens
What causes measles and how is it spread?|A virus, spread in droplets from coughs and sneezes. Typical symptoms are fever and a red rash; vaccination reduces its spread.|Viral diseases
Why can HIV lead to AIDS?|HIV attacks immune cells. Without effective control, the immune system can become severely damaged and vulnerable to infections; this later stage is AIDS.|Viral diseases
How is HIV transmitted and controlled?|Through sexual contact or exchange of infected bodily fluids. Antiretroviral drugs can control infection; ordinary social contact does not spread it.|Viral diseases
How does tobacco mosaic virus affect plants?|It causes mosaic-pattern discolouration of leaves, reducing photosynthesis and therefore growth.|Viral diseases
What causes Salmonella food poisoning?|Salmonella bacteria in contaminated food. They can cause fever, cramps, vomiting and diarrhoea. Food hygiene and poultry vaccination help reduce spread.|Bacterial diseases
What causes gonorrhoea and how does it spread?|A bacterium transmitted by sexual contact. Symptoms can include discharge and pain when urinating. Condoms reduce transmission; antibiotic resistance complicates treatment.|Bacterial diseases
What causes rose black spot?|A fungal pathogen. Dark spots develop on leaves, which may yellow and fall, reducing photosynthesis. Spores spread by wind and water.|Fungal diseases
What causes malaria and what is its vector?|A protist causes malaria; mosquitoes transmit it between hosts. The mosquito is the vector, not the pathogen.|Protist diseases
How can malaria transmission be reduced?|Use mosquito nets and reduce mosquito breeding sites. This targets the vector and reduces bites that transmit the protist.|Transmission
How do hygiene and isolation reduce disease spread?|Hygiene removes pathogens or prevents transfer. Isolation reduces contact between infected and susceptible people.|Transmission
How does skin protect against pathogens?|It forms a physical barrier; blood clotting and scab formation seal wounds and limit entry.|Human defences
How do the nose, mucus and cilia defend the body?|Nasal hairs and mucus trap particles and pathogens. Cilia move mucus towards the throat, away from the lungs.|Human defences
How does the stomach protect against pathogens?|Hydrochloric acid destroys many pathogens swallowed with food or mucus.|Human defences
What is phagocytosis?|A white blood cell engulfs and digests a pathogen. It is one defence mechanism, separate from antibody production.|Human defences
How do antibodies act against a pathogen?|They bind to specific antigens on that pathogen, helping the immune system target it. Different antigens require different antibodies.|Human defences
What do antitoxins do?|They neutralise toxins produced by some bacteria, reducing their harmful effects.|Human defences
How does vaccination give longer-term protection?|Antigens stimulate a primary immune response and memory cells. A later encounter leads to faster production of specific antibodies, reducing illness.|Vaccination
Why can vaccinating many people reduce transmission?|Fewer susceptible people allow the pathogen to spread less easily. This can also protect some people who cannot be vaccinated.|Vaccination
Why do antibiotics not treat viral infections?|They target bacterial structures or processes that viruses do not possess. Viruses replicate inside host cells; antibiotics are not designed to stop that replication.|Medicines
How does antibiotic resistance become common?|Resistant bacteria survive antibiotic treatment and reproduce. Selection increases their proportion; bacteria do not choose to become resistant.|Medicines
How do painkillers differ from antibiotics?|Painkillers relieve symptoms without killing pathogens. Antibiotics act against susceptible bacteria, not all causes of illness.|Medicines
Where did aspirin, digitalis and penicillin originate?|Aspirin was developed from substances in willow; digitalis originates from foxgloves; penicillin was discovered from Penicillium mould by Fleming.|Drug discovery
What are the aims of drug testing?|To assess toxicity, efficacy and dose: whether a drug is acceptably safe, works and has an appropriate amount to administer.|Drug testing
What is the sequence of preclinical and clinical testing?|Preclinical tests use cells, tissues and animals. Clinical trials then use volunteers and patients, starting with low doses and assessing safety, effectiveness and optimum dose.|Drug testing
What is a placebo?|A control treatment without the active drug being tested. Comparing groups helps distinguish the drug's effect from expectation or other factors.|Drug testing
Why use a double-blind trial?|Neither patients nor the treating researchers know who receives the drug or placebo. This reduces expectation and observer bias.|Drug testing
Why are larger trials and peer review useful?|More participants improve reliability and reveal less common effects. Independent scrutiny checks methods, evidence and conclusions; it does not guarantee zero risk.|Working scientifically
What are monoclonal antibodies?|Identical antibodies produced from a single clone of cells, specific to one binding site on one protein antigen.|Monoclonal antibodies|TH
How is a hybridoma made?|An antibody-producing mouse lymphocyte is fused with a tumour cell. The hybridoma both makes the antibody and divides, so it can be cloned for production.|Monoclonal antibodies|TH
How can monoclonal antibodies be used?|To detect hormones in pregnancy tests, locate molecules using fluorescent markers or target treatment to particular cells. Target specificity is useful, but side effects can still occur.|Monoclonal antibodies|TH
What can indicate plant disease?|Stunted growth, leaf spots, decay, abnormal growths, discolouration or pests. These signs alone do not identify the exact pathogen.|Plant disease|TH
How can plant diseases be identified?|Use reference guides, laboratory analysis or antibody-based testing kits. Match a suspected cause to supporting evidence rather than guessing from one symptom.|Plant disease|TH
How do nitrate and magnesium deficiencies affect plants?|Nitrate deficiency limits amino-acid and protein synthesis, causing stunted growth. Magnesium deficiency reduces chlorophyll and causes chlorosis, or yellow leaves.|Plant disease|T
What are physical plant defences?|Cellulose cell walls, a waxy cuticle and layers of dead cells provide barriers against pathogen entry.|Plant defence|T
What are chemical and mechanical plant defences?|Antibacterial chemicals act against bacteria; poisons deter herbivores. Thorns, hairs, touch-sensitive leaves and mimicry can deter animals.|Plant defence|T
`);
  topic('b4','B4 · Bioenergetics','Biology',[4],`
What is the word equation for photosynthesis?|Carbon dioxide + water → glucose + oxygen, using light absorbed by chlorophyll.|Photosynthesis
What is the balanced symbol equation for photosynthesis?|6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Count each element on both sides; light supplies energy but is not a chemical reactant.|Photosynthesis
Why is photosynthesis endothermic?|It transfers energy from the surroundings into the plant through light absorption. Energy is stored in the chemical products.|Photosynthesis
Where does photosynthesis take place?|In chloroplasts. Chlorophyll absorbs light that transfers energy for the reaction.|Photosynthesis
How does light intensity affect photosynthesis?|Increasing light intensity increases the rate until another factor prevents a further increase. A plateau does not mean photosynthesis has stopped.|Photosynthesis
How does carbon dioxide concentration affect photosynthesis?|Increasing it can increase the rate because more reactant is available, until another factor limits the rate.|Photosynthesis
How does temperature affect photosynthesis?|The rate usually rises towards an optimum as enzyme-controlled reactions speed up. Above the optimum, enzymes can denature and the rate falls.|Photosynthesis
Why can low chlorophyll reduce photosynthesis?|Less chlorophyll absorbs less light, reducing the energy available for photosynthesis even if other conditions are favourable.|Photosynthesis
What is a limiting factor in photosynthesis?|The factor preventing a higher rate at that moment. Adding more of a different factor may make no difference while the limiting factor stays unchanged.|Limiting factors|H
Why does a photosynthesis graph level off?|The factor on the x-axis is no longer limiting; another factor now restricts the rate. Use the conditions given to identify which one.|Limiting factors|H
How does distance from a lamp affect light intensity?|For a point source, intensity is proportional to 1 ÷ distance². Doubling the distance reduces intensity to one quarter, not one half.|Calculation|H
If a lamp moves from 10 cm to 30 cm, what happens to intensity?|Distance becomes three times larger, so intensity becomes 1/3² = 1/9 of its original value under the inverse-square model.|Calculation|H
Why must greenhouse improvements be cost-effective?|Extra heat, light or carbon dioxide can increase growth, but income from increased yield must outweigh the costs. Improve the actual limiting factor.|Evaluation|H
What do you change in the pondweed practical?|Light intensity, often by changing a lamp's distance. Measure oxygen production per unit time to estimate photosynthesis rate.|Required practical
What must be controlled in the pondweed practical?|Temperature, carbon dioxide availability, pondweed species and size, and measurement time. Allow time to acclimatise after changing the lamp distance.|Required practical
Why is measuring oxygen volume better than counting bubbles?|Bubbles may differ in size. Collecting volume over a fixed time gives a more comparable measure, though leaks and dissolved oxygen can still affect results.|Required practical
How do you calculate a photosynthesis rate from gas volume?|Rate = oxygen volume ÷ time. For 12 cm³ in 4 minutes, rate is 3 cm³/min. Keep units consistent.|Calculation
Why repeat pondweed measurements?|Repeats reveal variability and allow a mean. Investigate anomalies rather than discarding inconvenient results without a reason.|Working scientifically
How is glucose used in plant respiration?|Glucose is broken down to transfer energy for processes such as active transport and synthesis. Plants respire as well as photosynthesise.|Glucose uses
Why store glucose as starch?|Starch is insoluble, so it does not diffuse out easily or strongly affect osmosis. It can be broken down when glucose is needed.|Glucose uses
How do plants use glucose to make structural materials?|It can be converted to cellulose for cell walls and, with nitrate ions, used to make amino acids and then proteins.|Glucose uses
What are other storage products made from glucose?|Fats and oils. These can store energy, for example in seeds.|Glucose uses
What is cellular respiration?|An exothermic set of reactions in living cells that transfers energy from glucose. It is not the same as breathing or ventilation.|Respiration
What is the word equation for aerobic respiration?|Glucose + oxygen → carbon dioxide + water. It transfers energy for life processes.|Respiration
What is the balanced equation for aerobic respiration?|C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O. Most aerobic respiration takes place in mitochondria.|Respiration
What is anaerobic respiration in human muscles?|Glucose is incompletely broken down to lactic acid without oxygen, transferring less energy per glucose molecule than aerobic respiration.|Respiration
What are the products of anaerobic respiration in yeast?|Ethanol and carbon dioxide. This process is fermentation and is useful in bread-making and alcoholic-drink production.|Respiration
Why do heart rate and breathing increase during exercise?|Muscles need more energy, so greater delivery of oxygen and glucose supports respiration and faster removal of carbon dioxide.|Exercise
What can happen if muscles receive too little oxygen?|Anaerobic respiration contributes to energy transfer. Lactic acid accumulates and an oxygen debt develops; prolonged vigorous exercise can cause fatigue.|Exercise
What is oxygen debt?|The extra oxygen needed after exercise to deal with the accumulated lactic acid. Breathing and heart rate remain raised during recovery.|Exercise|H
What happens to lactic acid after exercise?|It is transported in blood from muscles to the liver, where it can be converted back to glucose. This helps explain post-exercise oxygen demand.|Exercise|H
What is metabolism?|The sum of all chemical reactions in a cell or organism, including synthesis of larger molecules, respiration and breakdown reactions.|Metabolism
What building blocks form proteins and lipids?|Amino acids form proteins. Lipids form from glycerol and fatty acids; a typical fat molecule uses one glycerol and three fatty acids.|Metabolism
What happens when excess proteins are broken down?|Urea is formed for excretion. Protein breakdown is one example of metabolism, not respiration itself.|Metabolism
`);
  topic('c1','C1 · Atoms & periodic table','Chemistry',[11,13,14],`
What is an element?|A substance containing only one type of atom, defined by its proton number. Its atoms may still be different isotopes.|Atoms
What is a compound?|Two or more different elements chemically bonded in fixed proportions. Separating a compound into its elements requires chemical change.|Atoms
What is a mixture?|Two or more substances together without chemical bonding between them. They retain their properties and can be separated physically.|Separation
How does filtration separate a mixture?|An insoluble solid is trapped by filter paper while liquid passes through as filtrate. Dissolved substances generally pass through too.|Separation
When is crystallisation useful?|For obtaining a dissolved solid from solution. Evaporate some solvent, allow crystals to form, then separate and dry them.|Separation
What does simple distillation collect?|A solvent vaporises and is condensed back to a liquid, separating it from dissolved substances with much higher boiling points.|Separation
Why use fractional distillation?|To separate liquids with different boiling points. Repeated evaporation and condensation in a fractionating column improves separation.|Separation
What is the principle of chromatography?|Substances move different distances because of different attractions to the stationary and mobile phases. It can separate mixtures and help identify substances.|Separation
Why must a chromatography start line be in pencil?|Graphite does not dissolve in the solvent. Ink could dissolve and create extra spots. Keep the sample spots above the starting solvent level.|Separation
How do you balance a chemical equation?|Change coefficients in front of formulae until each element has equal atom counts on both sides. Never change a compound's formula to balance it.|Equations
What are the relative charges of subatomic particles?|Proton +1, neutron 0, electron −1. A neutral atom has equal numbers of protons and electrons.|Atoms
What are the relative masses of subatomic particles?|Proton 1, neutron 1, electron approximately 1/1836. Almost all atomic mass is concentrated in the nucleus.|Atoms
What is atomic number?|The number of protons in an atom's nucleus. It identifies the element and equals electron number for a neutral atom.|Atoms
What is mass number?|The total number of protons and neutrons in a nucleus. Neutron number = mass number − atomic number.|Atoms
How many subatomic particles are in neutral sodium-23?|Atomic number 11 means 11 protons and 11 electrons. Mass number 23 gives 23 − 11 = 12 neutrons.|Calculation
What are isotopes?|Atoms of the same element with the same proton number but different neutron numbers, and therefore different mass numbers.|Atoms
How do atoms become ions?|By losing or gaining electrons. Losing electrons makes a positive ion; gaining them makes a negative ion. The nucleus is unchanged.|Atoms
How is relative atomic mass calculated from isotope abundances?|Add isotope mass × percentage abundance for each isotope, then divide by 100. This is a weighted mean, not a simple average unless abundances are equal.|Calculation
What is the relative atomic mass of 75% chlorine-35 and 25% chlorine-37?|((35 × 75) + (37 × 25)) ÷ 100 = 35.5. Greater weight is given to the more abundant isotope.|Calculation
What is the electron arrangement of sodium?|2,8,1. For the first 20 elements, fill the innermost shells first using the GCSE model of 2,8,8 before the fourth shell.|Electron structure
Why was the plum-pudding model proposed?|Discovery of negatively charged electrons showed atoms were divisible. The model placed electrons within a diffuse sphere of positive charge.|Atomic models
What did alpha-scattering evidence show?|Most alpha particles passed through foil, showing atoms are mostly empty space. A few large deflections showed positive charge and most mass occupy a tiny dense nucleus.|Atomic models
How did Bohr and Chadwick develop the atomic model?|Bohr proposed electrons at specific energy levels. Chadwick later provided evidence for neutrons in the nucleus.|Atomic models
How is the modern periodic table arranged?|By increasing atomic number. Groups are vertical columns of elements with similar properties; periods are horizontal rows.|Periodic table
Why do elements in one main group have similar reactions?|They have the same number of outer-shell electrons, so they tend to form ions or bonds in similar ways.|Periodic table
Why did Mendeleev leave gaps?|He predicted undiscovered elements and their properties. Later discoveries matched his predictions and supported his table.|Periodic table
Why are noble gases unreactive?|Their outer electron shells are complete: helium has two electrons and the others have eight. Their electronic arrangements are stable.|Groups
What happens to noble-gas boiling points down Group 0?|They increase as relative atomic mass increases. Do not confuse this physical trend with chemical reactivity.|Groups
What is the reaction of sodium with water?|Sodium + water → sodium hydroxide + hydrogen. The solution becomes alkaline; balanced equation: 2Na + 2H₂O → 2NaOH + H₂.|Groups
Why does Group 1 reactivity increase down the group?|The outer electron is farther from the nucleus and more shielded, so it is lost more easily despite the higher nuclear charge.|Groups
Why does Group 7 reactivity decrease down the group?|A halogen gains an electron. Greater distance and shielding reduce the attraction for an incoming electron.|Groups
How does halogen displacement work?|A more reactive halogen displaces a less reactive halogen from its salt solution. Chlorine displaces bromine from bromide; the reverse does not occur.|Groups
How do transition metals differ from Group 1 metals?|They are generally harder, stronger, denser, have higher melting points and are less reactive. Some properties have exceptions, so use given data when supplied.|Transition metals|T
What are characteristic properties of many transition metals?|They form coloured compounds, ions with different charges and can act as catalysts. Iron, copper and nickel provide useful examples.|Transition metals|T
`);
  topic('c2','C2 · Bonding & structure','Chemistry',[12,13,14],`
What happens in ionic bonding?|Electrons transfer from metal atoms to non-metal atoms, forming positive and negative ions. The bond is strong electrostatic attraction between oppositely charged ions.|Ionic bonding
What ion does a Group 1 atom usually form?|A +1 ion by losing its single outer-shell electron, giving a stable full outer shell.|Ionic bonding
What ion does a Group 7 atom usually form?|A −1 ion by gaining one electron to complete its outer shell.|Ionic bonding
What is a giant ionic lattice?|A regular three-dimensional arrangement of positive and negative ions, held by strong electrostatic forces acting in all directions.|Ionic bonding
Why do ionic compounds have high melting points?|Large amounts of energy are needed to overcome the strong attractions between oppositely charged ions in the lattice.|Structure & properties
Why does solid sodium chloride not conduct?|Its ions are fixed in place and cannot carry charge through the solid. The issue is ion mobility, not absence of charged particles.|Structure & properties
Why does molten sodium chloride conduct?|Its ions are free to move and carry charge. Dissolving it in water also allows the ions to move.|Structure & properties
What is a covalent bond?|A shared pair of electrons between atoms, held by attractions involving their nuclei. Covalent bonds are strong.|Covalent bonding
How many shared pairs are in hydrogen, oxygen and nitrogen molecules?|H₂ has one shared pair, O₂ two and N₂ three. These represent single, double and triple covalent bonds.|Covalent bonding
How are bonds shown in a dot-and-cross diagram?|Use distinct symbols for electrons from each atom, show shared pairs in overlaps and include remaining outer electrons. Dots and crosses represent the same kind of particle.|Covalent bonding
Why do small molecular substances often have low boiling points?|Only weak intermolecular forces between molecules are overcome during boiling. Strong covalent bonds inside each molecule remain intact.|Structure & properties
Why do larger similar molecules often have higher boiling points?|Intermolecular forces are generally stronger, so more energy is required to separate molecules. This is not due to stronger covalent bonds within them.|Structure & properties
Why do small covalent molecules generally not conduct electricity?|They have no mobile ions or delocalised electrons to carry charge. Some substances ionise when dissolved, so use the stated conditions.|Structure & properties
What is a polymer?|A large molecule of repeating units joined by covalent bonds. Stronger intermolecular forces between large chains often make polymers solid.|Polymers
What is a giant covalent structure?|A network of atoms bonded by strong covalent bonds throughout the structure, rather than separate small molecules.|Giant covalent
Why is diamond hard and high-melting?|Every carbon forms four covalent bonds in a rigid three-dimensional network. Many strong bonds must be broken to melt it.|Giant covalent
Why does diamond not conduct electricity?|All outer electrons are used in covalent bonds, so there are no delocalised electrons or mobile ions to carry charge.|Giant covalent
How are carbon atoms bonded in graphite?|Each carbon forms three covalent bonds in hexagonal layers. Its fourth outer electron is delocalised.|Giant covalent
Why does graphite conduct electricity?|Its delocalised electrons can move through the structure and carry charge. Graphite is an exception to the usual non-conduction of covalent substances.|Giant covalent
Why is graphite useful as a lubricant?|Weak forces between the layers allow them to slide over one another, while strong covalent bonds remain within each layer.|Giant covalent
What is graphene?|A single layer of graphite, one atom thick. It is strong and conducts electricity, making it useful in electronics and composite materials.|Carbon structures
What are fullerenes?|Carbon molecules with hollow shapes, often based on hexagonal rings with some five- or seven-membered rings. C₆₀ is a spherical example.|Carbon structures
What are carbon nanotubes used for?|Their high strength, high length-to-diameter ratio and electrical conduction make them useful in composites, electronics and nanotechnology.|Carbon structures
What is metallic bonding?|Strong electrostatic attraction between positive metal ions and delocalised electrons in a giant structure.|Metallic bonding
Why do metals conduct electricity?|Delocalised electrons move through the structure and carry charge. Metal ions are not flowing through a solid metal wire.|Structure & properties
Why can a pure metal be bent?|Layers of atoms can slide while metallic bonding holds the structure together. This is malleability.|Structure & properties
Why are alloys harder than pure metals?|Different-sized atoms distort the regular layers, making it harder for them to slide over each other.|Alloys
What is an alloy?|A mixture of two or more elements with at least one metal. Brass, for example, contains copper and zinc.|Alloys
How do particles behave in a solid, liquid and gas?|Solid particles vibrate about fixed positions; liquid particles stay close but move past each other; gas particles are widely separated and move randomly.|States of matter
What does (aq) mean in an equation?|Aqueous: dissolved in water. It is different from (l), which means a liquid substance.|States of matter
What limits simple particle diagrams?|They may omit forces, treat particles as solid spheres and fail to show realistic scale. A useful model is a simplification, not a literal photograph.|Particle model|H
What is the size range of nanoparticles?|About 1–100 nanometres. Their size gives a much larger surface-area-to-volume ratio than the same material in bulk.|Nanoparticles|T
Why can nanoparticles be effective catalysts?|More surface area is exposed relative to volume, so a small amount can provide many reaction sites. Their properties can differ from bulk material.|Nanoparticles|T
How should nanoparticle uses be evaluated?|Compare benefits in medicine, electronics or sunscreens with uncertainty about exposure and long-term effects. A small size alone does not prove safety.|Nanoparticles|T
`);
  topic('c3','C3 · Quantitative chemistry','Chemistry',[8,13,14],`
Why is mass conserved in a chemical reaction?|Atoms are rearranged but not created or destroyed. In a closed system the total mass of products equals total mass of reactants.|Chemical measurements
Why can burning magnesium appear to increase mass?|Oxygen from the air joins the magnesium to make magnesium oxide. Include the oxygen's mass when considering the whole reaction.|Chemical measurements
Why can a carbonate reaction appear to lose mass?|Carbon dioxide may escape from an open container. The gas still has mass; the apparent loss is not destruction of matter.|Chemical measurements
What is relative formula mass, Mr?|The sum of the relative atomic masses of all atoms shown in a chemical formula. Include every subscript and bracket multiplier.|Formula mass
What is the Mr of water using H = 1 and O = 16?|2 × 1 + 16 = 18. Two hydrogen atoms contribute 2 and one oxygen contributes 16.|Calculation
What is the Mr of calcium carbonate using Ca = 40, C = 12, O = 16?|40 + 12 + (3 × 16) = 100. The subscript 3 applies to oxygen only.|Calculation
What is the Mr of Mg(OH)₂ using Mg = 24, O = 16, H = 1?|24 + 2 × (16 + 1) = 58. The 2 outside the brackets multiplies both O and H.|Calculation
How do you calculate an element's percentage by mass?|Mass contribution of that element in the formula ÷ Mr of the compound × 100.|Chemical measurements
What percentage of CaCO₃ mass is oxygen using Mr = 100 and O = 16?|Three oxygen atoms contribute 48, so 48 ÷ 100 × 100 = 48%.|Calculation
How is uncertainty estimated from repeated measurements?|Use the spread of results around the mean; for a simple repeat-based estimate use half the range when asked. Greater spread suggests more uncertainty.|Working scientifically
Why calculate a mean from repeat readings?|It reduces the influence of random variation and summarises the results. Repetition does not automatically remove systematic errors.|Working scientifically
What does a state symbol tell you?|Whether a substance is solid (s), liquid (l), gas (g) or aqueous (aq). State symbols help explain gas-related apparent mass changes.|Equations
How do you balance hydrogen reacting with oxygen?|2H₂ + O₂ → 2H₂O. Both sides contain four H atoms and two O atoms; do not change H₂O to another formula.|Equations
How is methane combustion balanced?|CH₄ + 2O₂ → CO₂ + 2H₂O. Count one carbon, four hydrogens and four oxygens on each side.|Equations
Why does a coefficient affect the whole formula?|2H₂O means two water molecules: four H atoms and two O atoms. A subscript changes atom numbers within one molecule instead.|Equations
What is mass concentration?|Mass of solute divided by volume of solution. With grams and dm³, concentration is expressed in g/dm³.|Concentration
How do you convert cm³ into dm³?|Divide by 1000. A volume of 250 cm³ is 0.250 dm³, not 250 dm³.|Units
What is the concentration of 5 g solute in 0.25 dm³ solution?|5 ÷ 0.25 = 20 g/dm³. Convert the volume before substituting.|Calculation
How much solute is needed for 0.5 dm³ of a 12 g/dm³ solution?|Mass = concentration × volume = 12 × 0.5 = 6 g.|Calculation
How does diluting a solution change concentration?|Adding solvent increases solution volume without adding solute, so concentration decreases. Doubling volume halves concentration if solute mass stays constant.|Concentration
What is a mole?|An amount containing 6.02 × 10²³ specified particles. State whether these are atoms, molecules or ions.|Moles|H
What is the formula connecting moles, mass and Mr?|Amount in mol = mass in g ÷ Mr. For an element use its Ar. The molar mass in g/mol is numerically equal to Mr or Ar.|Moles|H
How many moles are in 36 g of water with Mr = 18?|36 ÷ 18 = 2 mol. This represents twice Avogadro's number of water molecules.|Calculation|H
What mass is 0.5 mol of CO₂ with Mr = 44?|Mass = moles × Mr = 0.5 × 44 = 22 g.|Calculation|H
How many molecules are in 2 mol of a molecular substance?|2 × 6.02 × 10²³ = 1.204 × 10²⁴ molecules. The specified particle matters.|Calculation|H
What do balanced-equation coefficients show about moles?|They give the reacting mole ratio. In 2Mg + O₂ → 2MgO, 2 mol Mg reacts with 1 mol O₂ to make 2 mol MgO.|Stoichiometry|H
How do you calculate a product mass from a reactant mass?|Convert the reactant mass to moles, use the balanced-equation ratio, then multiply product moles by its Mr.|Stoichiometry|H
What mass of MgO forms from 24 g Mg with excess oxygen, using Mg = 24 and MgO = 40?|24 ÷ 24 = 1 mol Mg. The Mg:MgO ratio is 1:1, so 1 × 40 = 40 g MgO.|Calculation|H
What is a limiting reactant?|The reactant used up first. Once it is exhausted, no more product can form even when other reactants remain.|Stoichiometry|H
How can mole calculations reveal an equation's coefficients?|Convert measured masses to moles, divide by the smallest mole value and obtain a simple whole-number ratio. Check that atom counts balance.|Stoichiometry|H
How is percentage yield calculated?|Actual yield ÷ theoretical yield × 100. It measures the amount actually obtained compared with the maximum calculated amount.|Yield|T
Why might a reaction have less than 100% yield?|Product can be lost during separation, the reaction may be incomplete or reversible, or other reactions can produce unwanted substances.|Yield|T
How is atom economy calculated?|Mr of the desired product, allowing for coefficients, ÷ total Mr of all products, allowing for coefficients, × 100. It describes how reactant atoms are used.|Atom economy|T
How is concentration in mol/dm³ calculated?|Moles ÷ solution volume in dm³. For titration calculations, use the balanced ratio before converting to concentration.|Concentration|TH
What volume does one mole of gas occupy at room temperature and pressure?|24 dm³ or 24,000 cm³ under GCSE room-temperature-and-pressure conditions. Volume = moles × 24 dm³.|Gases|TH
`);
  topic('c4','C4 · Chemical changes','Chemistry',[9,13,14],`
What is oxidation in terms of oxygen?|Gain of oxygen. A metal reacting with oxygen to form a metal oxide is oxidised.|Redox
What is reduction in terms of oxygen?|Loss of oxygen. Removing oxygen from a metal oxide produces the metal.|Redox
What does a reactivity series rank?|Metals by their tendency to react and form positive ions. More reactive metals lose electrons more readily.|Metals
What is metal displacement?|A more reactive metal displaces a less reactive metal from its compound. Iron can displace copper from copper sulfate solution.|Metals
Why can carbon extract some metals from their oxides?|Carbon can reduce oxides of metals less reactive than itself, removing oxygen. More reactive metals generally need another extraction method.|Extraction
Why is aluminium extracted by electrolysis rather than carbon reduction?|Aluminium is more reactive than carbon, so carbon cannot readily remove its oxygen. Electrolysis separates the molten compound.|Extraction
Why are some unreactive metals found native?|They do not readily react with other substances, so metals such as gold can occur as the element rather than only as compounds.|Extraction
What are the products of a dilute acid reacting with a suitable metal?|A salt and hydrogen. Hydrochloric acid makes chlorides and sulfuric acid makes sulfates.|Acids
What are the products of acid plus metal oxide?|Salt and water. The metal oxide acts as a base and neutralises the acid.|Acids
What are the products of acid plus metal carbonate?|Salt, water and carbon dioxide. Carbon dioxide gives a milky result with limewater.|Acids
What is an alkali?|A base that dissolves in water, producing hydroxide ions in solution. Not every base is soluble.|Acids
What ions do acids and alkalis produce in aqueous solution?|Acids produce H⁺ ions; alkalis produce OH⁻ ions. These react in neutralisation to form water.|Acids
What does pH show?|Below 7 is acidic, 7 neutral and above 7 alkaline for the GCSE scale. Universal indicator or a pH probe can measure pH.|Acids
How is copper sulfate made from copper oxide and sulfuric acid?|Warm dilute acid, add copper oxide until some remains, filter excess solid, gently evaporate some water, cool to crystallise and dry the crystals.|Required practical
Why add excess insoluble oxide when making a salt?|It ensures all acid has reacted. Any remaining solid is removed by filtration, leaving a salt solution.|Required practical
Why not evaporate a salt solution completely to dryness?|Gentle concentration followed by cooling allows crystals to form and reduces overheating, spitting and decomposition risks.|Required practical
What is an electrolyte?|A molten ionic compound or solution with mobile ions that can carry charge. Solid ionic compounds lack mobile ions.|Electrolysis
What does electrolysis do?|An electric current decomposes an electrolyte. Positive ions move to the negative cathode; negative ions move to the positive anode.|Electrolysis
What is produced from molten lead bromide at each electrode?|Lead at the cathode and bromine at the anode. In the molten compound there are no competing ions from water.|Electrolysis
Why is cryolite used in aluminium extraction?|It lowers the operating melting temperature of the mixture containing aluminium oxide, reducing the energy needed.|Extraction
Why do carbon anodes wear away in aluminium extraction?|Oxygen formed at the positive electrode reacts with hot carbon to form carbon dioxide. The carbon anode must be replaced.|Extraction
What forms at the cathode during electrolysis of aqueous sodium chloride?|Hydrogen, because sodium is more reactive than hydrogen. Water supplies hydrogen ions; sodium metal is not deposited.|Electrolysis
What forms at the anode during electrolysis of aqueous sodium chloride in GCSE conditions?|Chlorine from chloride ions. In the usual GCSE rule, a halogen forms if halide ions are present; otherwise oxygen forms.|Electrolysis
What forms at the cathode in aqueous copper sulfate with inert electrodes?|Copper, because copper is less reactive than hydrogen. Cu²⁺ ions gain electrons and deposit as metal.|Electrolysis
What forms at the anode in aqueous copper sulfate with inert electrodes?|Oxygen, because no halide ions are present. Use inert electrodes: copper electrodes would change the outcome.|Electrolysis
How is the aqueous-electrolysis practical made a fair comparison?|Control voltage, electrode material and spacing, electrolyte volume and concentration. Record products and test gases safely using the school method.|Required practical
What does OIL RIG mean?|Oxidation Is Loss, Reduction Is Gain of electrons. Always specify electrons, not oxygen, when using this definition.|Redox|H
What is the half-equation for reduction of copper ions?|Cu²⁺ + 2e⁻ → Cu. Both atom count and total charge are balanced.|Half-equations|H
What is the half-equation for oxidation of chloride ions?|2Cl⁻ → Cl₂ + 2e⁻. Two chloride ions lose two electrons altogether.|Half-equations|H
How do strong and weak acids differ?|Strong acids ionise completely in aqueous solution; weak acids only partially ionise. This describes ionisation, not how concentrated the solution is.|Acids|H
How do concentrated and dilute acids differ?|Concentration describes acid amount per unit solution volume. A dilute strong acid and a concentrated weak acid are both possible.|Acids|H
What happens to hydrogen-ion concentration when pH falls by one?|It increases tenfold. A fall from pH 3 to pH 1 means a hundredfold increase.|Calculation|H
What is the ionic equation for acid–alkali neutralisation?|H⁺(aq) + OH⁻(aq) → H₂O(l). Spectator ions are not included.|Equations|H
Why use titration to make a salt from acid and alkali?|Both reactants are soluble, so excess cannot be filtered off. Titration finds exact reacting volumes; repeat without indicator to obtain pure salt.|Titration|T
How do you find a reliable titration volume?|Use a pipette for a known volume, add titrant from a burette, swirl and add dropwise near the endpoint. Repeat until concordant titres are obtained, following school guidance.|Required practical|T
How does a titration calculation use the equation?|Find moles of the known solution with concentration × volume in dm³, use the balanced reacting ratio, then divide unknown moles by its solution volume.|Calculation|TH
`);
  topic('c5','C5 · Energy changes','Chemistry',[10,13,14],`
What is an exothermic reaction?|One that transfers energy to the surroundings, usually increasing their temperature. The products have less chemical energy than the reactants.|Energy transfers
What is an endothermic reaction?|One that takes energy from the surroundings, usually decreasing their temperature. The products have more chemical energy than the reactants.|Energy transfers
Is combustion normally exothermic or endothermic?|Exothermic. Burning fuel transfers energy to the surroundings, for example by heating.|Energy transfers
Is acid–alkali neutralisation normally exothermic or endothermic?|Exothermic. The reacting solution typically warms as energy is transferred to its surroundings.|Energy transfers
Is thermal decomposition normally endothermic or exothermic?|Endothermic. Energy must be supplied to break down the compound, for example calcium carbonate when heated.|Energy transfers
Why are chemical hand warmers useful?|They use an exothermic process to transfer energy to the hands. The chemicals provide a finite energy source.|Applications
Why can a chemical cold pack cool an injury?|An endothermic process absorbs energy from its surroundings, lowering the pack's temperature. This is an energy transfer, not destruction of heat.|Applications
How is energy conserved in a chemical reaction?|The energy decrease or increase of the chemicals is balanced by energy transferred to or from the surroundings. Total energy is conserved.|Energy transfers
What is activation energy?|The minimum energy colliding particles need for a successful reaction. A reaction can release energy overall while still requiring an initial input.|Reaction profiles
What are the axes of a reaction profile?|Energy on the vertical axis and progress of reaction on the horizontal axis. It is not a graph of temperature against time.|Reaction profiles
How do you recognise an exothermic reaction profile?|Products finish at a lower energy level than reactants. The overall change is a decrease, even though the curve first rises over a barrier.|Reaction profiles
How do you recognise an endothermic reaction profile?|Products finish at a higher energy level than reactants, showing an overall increase in the chemicals' energy.|Reaction profiles
How do you mark activation energy on a reaction profile?|Draw an energy difference from the reactant level to the peak. It is not the gap between reactants and products.|Reaction profiles
How do you mark the overall energy change on a profile?|Show the difference between reactant and product energy levels. Its direction distinguishes exothermic from endothermic.|Reaction profiles
What does a catalyst do to a reaction profile?|It provides a pathway with lower activation energy. The start and finish energy levels, and overall energy change, remain the same.|Reaction profiles
What does the temperature-change practical measure?|The difference between initial and highest or lowest temperature of a reacting mixture, used to compare energy transfer under controlled conditions.|Required practical
Why use an insulated cup in a temperature-change experiment?|It reduces energy exchange with the wider surroundings, making the recorded temperature change closer to that caused by the reaction.|Required practical
Why might you use a lid on an insulated cup?|It reduces energy loss and evaporation while allowing safe measurement. Do not seal a gas-producing reaction in an unsuitable closed container.|Required practical
Why stir a reacting solution gently?|To distribute heat and reactants so the thermometer reading better represents the mixture. Keep stirring method consistent.|Required practical
Which variables should be controlled when comparing temperature changes?|Solution volumes, starting temperature, concentrations unless being varied, container and insulation. Change one independent variable at a time.|Required practical
Why record the highest or lowest temperature rather than a late reading?|Energy can exchange with the room after the reaction. A late reading may underestimate the reaction's maximum temperature change.|Required practical
How do repeat measurements improve this practical?|They show variation, identify anomalies and allow a mean temperature change. Systematic heat loss can still remain.|Working scientifically
A mixture rises from 20°C to 28°C. What is its temperature change?|28 − 20 = +8°C. The warming surroundings indicate an exothermic process in the usual practical conditions.|Calculation
A mixture falls from 22°C to 16°C. What is its temperature change?|16 − 22 = −6°C, a fall of 6°C. The cooling surroundings indicate an endothermic process.|Calculation
Why can unequal starting temperatures make comparisons unfair?|Temperature affects readings and heat exchange with the room. Bring solutions to the same starting conditions before comparing trials.|Required practical
Why can measured temperature changes underestimate energy transfer?|Some energy heats the apparatus or is exchanged with the air instead of the measured solution. Better insulation reduces, but does not eliminate, this.|Evaluation
Does breaking a chemical bond require or release energy?|It requires energy and is endothermic. Energy must be transferred in to overcome attraction between bonded atoms.|Bond energies|H
Does forming a chemical bond require or release energy?|It releases energy and is exothermic. New stable bonds have lower energy than the separated atoms.|Bond energies|H
How do you calculate overall reaction energy from bond energies?|Total energy needed to break reactant bonds minus total energy released forming product bonds. Count every bond using the balanced equation.|Bond energies|H
What does a negative bond-energy result mean?|The reaction is exothermic: bond formation releases more energy than bond breaking requires.|Bond energies|H
What does a positive bond-energy result mean?|The reaction is endothermic: breaking bonds requires more energy than forming bonds releases.|Bond energies|H
Breaking bonds needs 500 kJ/mol and forming bonds releases 700 kJ/mol. What is the change?|500 − 700 = −200 kJ/mol, so the reaction is exothermic. State both the sign and the interpretation.|Calculation|H
How does a simple chemical cell produce a potential difference?|Different metals contact an electrolyte and chemical reactions drive charge movement. Voltage depends on the electrodes and electrolyte.|Cells & batteries|T
How do rechargeable and non-rechargeable cells differ?|An external current can reverse the chemical reactions in rechargeable cells. A non-rechargeable cell stops providing useful current when a reactant is used up.|Cells & batteries|T
What is a battery in the GCSE model?|Two or more cells connected together. Connecting cells in series increases the potential difference if oriented consistently.|Cells & batteries|T
What is the overall reaction in a hydrogen fuel cell?|Hydrogen reacts with oxygen to form water: 2H₂ + O₂ → 2H₂O. Fuel and oxygen are supplied continuously rather than stored solely inside a disposable cell.|Fuel cells|T
How should hydrogen fuel cells be evaluated?|They produce water at point of use and can keep operating with fuel supplied, but hydrogen production, storage, transport, cost and flammability matter.|Evaluation|T
`);
  topic('p1','P1 · Energy','Physics',[15,16,1,19,20],`
What are the eight GCSE energy stores?|Kinetic, thermal, chemical, gravitational potential, elastic potential, nuclear, magnetic and electrostatic. Stores describe where energy is held.|Energy stores
What are the four energy-transfer pathways?|Mechanically, electrically, by heating and by radiation. A pathway transfers energy between stores; it is not another store.|Energy transfers
What is a system in an energy question?|An object or group of objects chosen for study. State what is included before describing energy transfers.|Energy transfers
What is the principle of energy conservation?|Energy cannot be created or destroyed, only transferred between stores. Total energy in a closed system remains constant.|Conservation
How does lifting a book change its energy stores?|The person's chemical store decreases and the book's gravitational potential store increases. Mechanical work transfers energy; some is dissipated to the surroundings.|Energy transfers
How does a car braking transfer energy?|Its kinetic store decreases and thermal stores of brakes and surroundings increase. Friction transfers energy by mechanical work and heating.|Energy transfers
What happens to energy when a falling object speeds up?|Its gravitational potential store decreases and kinetic store increases. Air resistance can also transfer energy to thermal stores of the surroundings.|Energy transfers
How does a battery-powered torch transfer energy?|The battery's chemical store decreases. Electrical work transfers energy to the lamp, which transfers energy by light radiation and heating.|Energy transfers
What is dissipated energy?|Energy spread into less useful stores, often thermal stores of the surroundings. It remains conserved but is less useful for the intended task.|Dissipation
How does lubrication reduce unwanted energy transfer?|It reduces friction between moving surfaces, so less energy transfers to thermal stores for the same intended movement.|Dissipation
How does insulation reduce energy transfer?|It slows transfer by heating, for example using low-conductivity materials or trapped air. Thicker walls and lower conductivity can reduce building cooling rate.|Dissipation
What is the kinetic-energy equation?|Eₖ = ½mv², with energy in J, mass in kg and speed in m/s. Square speed before multiplying.|Equations
What is the kinetic energy of 2 kg moving at 3 m/s?|½ × 2 × 3² = 9 J. Forgetting to square speed would give the wrong value.|Calculation
What happens to kinetic energy if speed doubles?|It becomes four times larger because kinetic energy is proportional to speed squared, assuming mass stays constant.|Calculation
What is the gravitational potential-energy equation?|Eₚ = mgh, with m in kg, g in N/kg and h in m. Use the value of g stated in the question.|Equations
A 2 kg object rises 5 m with g = 10 N/kg. What energy is gained?|2 × 10 × 5 = 100 J of gravitational potential energy. Height change matters, not total distance travelled.|Calculation
What is the elastic potential-energy equation?|Eₑ = ½ke², where k is spring constant in N/m and e is extension in m. This applies while the limit of proportionality is not exceeded.|Equations
A 100 N/m spring extends 0.1 m. What energy is stored?|½ × 100 × 0.1² = 0.5 J. Convert centimetres to metres before squaring.|Calculation
What does specific heat capacity measure?|Energy needed to raise the temperature of 1 kg of a substance by 1°C. Its unit is J/(kg °C).|Heating
What equation describes a temperature-related thermal-energy change?|ΔE = mcΔθ. Use mass in kg, specific heat capacity in J/(kg °C) and temperature change in °C.|Equations
What is power?|The rate of energy transfer or work done: P = E/t or W/t. One watt equals one joule per second.|Power
An appliance transfers 600 J in 30 s. What is its power?|600 ÷ 30 = 20 W. It transfers 20 joules each second.|Calculation
Which of two motors doing equal work is more powerful?|The one doing it in less time. Equal total work does not mean equal power.|Power
How is efficiency calculated?|Useful energy output ÷ total energy input, or useful power output ÷ total power input. Multiply by 100 to express it as a percentage.|Efficiency
A device gives 80 J useful output from 100 J input. What is its efficiency?|80 ÷ 100 = 0.8, or 80%. The remaining 20 J is transferred in less useful ways, not destroyed.|Calculation
What distinguishes a renewable energy resource?|It is replenished, or can be replenished, as it is used. Wind, sunlight, tides, hydroelectricity, waves, geothermal and biofuels are examples.|Energy resources
Which energy resources are non-renewable?|Coal, oil, natural gas and nuclear fuels. Nuclear fuel is not a fossil fuel, but its supply is finite.|Energy resources
Why are wind and solar less dependable at any particular moment?|Wind speed and sunlight vary; solar produces no output at night. Energy storage or other generation may be needed to meet demand.|Energy resources
How do fossil fuels affect the environment?|Burning them releases carbon dioxide, contributing to climate change. Extraction and other emissions can cause additional environmental harm.|Energy resources
How should nuclear electricity generation be evaluated?|It has low operational carbon-dioxide emissions and dependable output, but radioactive waste, construction cost, decommissioning and accident risks must be considered.|Evaluation
Why is biofuel not automatically carbon neutral?|Growing plants absorbs carbon dioxide, but processing, transport, land-use change and burning affect the overall balance. Account for the complete system.|Evaluation
Why can political and economic factors affect energy choices?|Scientific evidence can identify impacts, but cost, demand, reliability, public views and policy influence which resources are used.|Evaluation
How do you investigate specific heat capacity?|Measure an insulated block's mass, temperature rise and energy supplied by a heater. Use c = E/(mΔθ), controlling heat loss and repeating. School supervision is required.|Required practical
How do you compare thermal insulating materials fairly?|Use equal containers, liquid volumes and starting temperatures, vary insulation and record cooling over equal times. Keep material thickness controlled unless that is the variable.|Required practical|T
How can an intended energy transfer be made more efficient?|Reduce unwanted transfers, for example by lubrication or insulation appropriate to the device. State which energy transfer is reduced and why.|Efficiency|H
`);
  topic('p2','P2 · Electricity','Physics',[17,1,19,20],`
What is electric current?|The rate of flow of electric charge, measured in amperes (A). Current is not the amount of energy a charge carries.|Current
What is the charge-flow equation?|Q = It, with charge in coulombs (C), current in amperes and time in seconds.|Equations
How much charge flows at 2 A for 30 s?|2 × 30 = 60 C. Convert time to seconds before substituting.|Calculation
What is potential difference?|Energy transferred per unit charge, measured in volts. One volt is one joule per coulomb.|Potential difference
What is electrical resistance?|A measure of opposition to current. Resistance is measured in ohms (Ω) and relates p.d. and current through V = IR.|Resistance
What is the equation linking potential difference, current and resistance?|V = IR. Rearranged, I = V/R and R = V/I. Use volts, amperes and ohms.|Equations
A component has 6 V across it and 2 A through it. What is its resistance?|R = 6 ÷ 2 = 3 Ω. The voltmeter measures across the component and the ammeter measures through it.|Calculation
How should an ammeter be connected?|In series with the component, so the same current flows through it. Do not connect an ammeter directly across a power supply.|Measurement
How should a voltmeter be connected?|In parallel across the component whose potential difference is being measured.|Measurement
What is an ohmic conductor?|A conductor whose current is directly proportional to potential difference at constant temperature. Its I–V graph is a straight line through the origin.|Components
Why does a filament lamp's resistance rise when it gets hotter?|Higher temperature makes ions vibrate more, increasing collisions with electrons. The I–V graph curves as resistance changes.|Components
How does a diode affect current?|It allows current mainly in one direction, with very high resistance in the reverse direction.|Components
How does an NTC thermistor respond to increasing temperature?|Its resistance decreases. This can be used in temperature-sensing circuits such as thermostats.|Components
How does an LDR respond to brighter light?|Its resistance decreases as light intensity increases. It can be used to detect darkness in an automatic-light circuit.|Components
What happens to current in a series circuit?|It has the same value at every point because there is one continuous path for charge.|Series circuits
How is potential difference distributed in series?|The supply p.d. is shared across the components. The component p.d.s add to the supply p.d.|Series circuits
How is total resistance found in series?|Add the component resistances: Rtotal = R₁ + R₂ + … . Adding resistance lowers current for the same supply p.d.|Series circuits
What happens to current in a parallel circuit?|It splits between branches. Total current into a junction equals total current out; branch currents add to the supply current.|Parallel circuits
What is the potential difference across parallel branches?|The same across every branch connected to the same two points of the supply.|Parallel circuits
Why does adding a parallel resistor reduce total resistance?|It creates another path for charge. Total resistance becomes less than that of the smallest individual resistor.|Parallel circuits
What is the difference between ac and dc?|Direct current flows in one direction. Alternating current repeatedly changes direction as supply p.d. alternates.|Mains
What are the UK mains supply values for GCSE?|Approximately 230 V and 50 Hz alternating current. These describe the domestic supply, not a battery.|Mains
What colours identify live, neutral and earth wires?|Live is brown, neutral blue and earth green-and-yellow. Their roles matter as much as their colours.|Mains safety
Why is an earth wire fitted to some appliances?|It connects a metal case to earth. A fault can produce a large current that causes protective disconnection, reducing shock risk. It normally carries no current.|Mains safety
How does a fuse protect a circuit?|Excess current heats and melts its thin wire, breaking the circuit. It is fitted in the live path; it does not regulate current continuously.|Mains safety
Why can a live wire be dangerous even when a switch is open?|It can still have a large potential difference relative to earth. Touching it may complete a circuit through a person. Never test mains circuits yourself.|Mains safety
What is the electrical-power equation?|P = VI, or P = I²R for a resistive component. Use watts, volts, amperes and ohms.|Equations
How much power is transferred at 12 V and 2 A?|P = 12 × 2 = 24 W. This means 24 joules are transferred each second.|Calculation
How do you calculate energy transferred by an appliance?|E = Pt. Alternatively E = QV. Time must be in seconds when power is in watts and energy in joules.|Equations
A 100 W device runs for 60 s. How much energy is transferred?|100 × 60 = 6000 J, or 6 kJ. Power is a rate, not the total energy.|Calculation
Why does the National Grid transmit at high potential difference?|For a given power, higher p.d. means lower current. Lower current reduces heating losses in transmission cables.|National Grid
What do step-up and step-down transformers do in the Grid?|Step-up transformers raise p.d. for transmission; step-down transformers lower it for consumers. The aim is efficient transfer followed by an appropriate supply voltage.|National Grid
How do you investigate wire length and resistance?|Measure V and I for different wire lengths and calculate R = V/I. Control material, thickness and temperature; use a low-voltage supply and switch off between readings to limit heating.|Required practical
How do you measure an I–V characteristic?|Vary p.d. with a low-voltage circuit, measure V across and I through the component, and plot I against V. Reverse supply polarity for negative readings where appropriate.|Required practical
How does an ideal transformer's current change?|With approximately conserved power, VpIp = VsIs. Increasing p.d. lowers current for the same transferred power; real transformers have losses.|National Grid|H
How does rubbing insulators produce static charge?|Electrons transfer between materials. The object gaining electrons becomes negative; the one losing them becomes positive. Protons do not move between the objects.|Static electricity|T
How do charged objects exert forces?|Like charges repel and unlike charges attract. An electric field surrounds a charged object and can exert a force without contact.|Static electricity|T
Why can static electricity produce a spark?|A large enough potential difference can cause charge to flow through air. Sparks can ignite flammable vapours, so controlled earthing helps reduce this hazard.|Static electricity|T
How are electric-field lines drawn for isolated charges?|Lines point away from a positive charge and towards a negative charge, in the direction of force on a positive test charge. Closer lines represent a stronger field.|Electric fields|T
`);
  topic('p3','P3 · Particle model','Physics',[1,19,20],`
How are particles arranged in a solid?|They are closely packed in a regular arrangement and vibrate about fixed positions. A solid keeps its shape and volume.|States
How are particles arranged in a liquid?|They remain close together but can move past each other. A liquid has a fixed volume but takes its container's shape.|States
How are particles arranged in a gas?|They are widely spaced and move rapidly in random directions. A gas fills its container and is easily compressed.|States
Why are gases less dense than most solids or liquids?|Particles are farther apart, so a given volume usually contains less mass. Particle arrangement explains density differences.|Density
What is the density equation?|Density = mass ÷ volume, ρ = m/V. SI units are kg/m³ using kg and m³; g/cm³ is also useful when consistently applied.|Density
An object has mass 200 g and volume 50 cm³. What is its density?|200 ÷ 50 = 4 g/cm³. Do not label this 4 kg/m³ without converting.|Calculation
What is the volume of a 6 kg object with density 3000 kg/m³?|V = m/ρ = 6 ÷ 3000 = 0.002 m³. Rearrange before substituting.|Calculation
How do you find the volume of a rectangular block?|Multiply length × width × height. Use consistent length units so the result is a cubic volume.|Required practical
How do you find an irregular solid's volume?|Submerge it fully and measure displaced liquid volume using a measuring cylinder or displacement can. Avoid trapped air and account for any support used.|Required practical
How do you find a liquid's density?|Measure an empty container's mass, then its mass with a known liquid volume. Subtract to obtain liquid mass, then divide by volume.|Required practical
Why read a measuring cylinder at eye level?|To avoid parallax error. For water, read the bottom of the meniscus using the cylinder's scale.|Measurement
How do you convert cm³ to m³?|Divide by 1,000,000. Cubic units scale differently from length: 1 cm³ = 10⁻⁶ m³.|Units
What is melting?|A change from solid to liquid. It is a physical state change and the substance's chemical identity remains the same.|Changes of state
What is freezing?|A change from liquid to solid. Energy transfers from the substance as its particles become more ordered.|Changes of state
What is condensation?|A change from gas to liquid. Particles become closer together as energy transfers out.|Changes of state
How do boiling and evaporation differ?|Boiling occurs throughout a liquid at its boiling point. Evaporation occurs at the surface and can occur below the boiling point.|Changes of state
What is sublimation?|A direct change from solid to gas without becoming liquid. The reverse direct change is deposition.|Changes of state
Why is mass conserved during a state change?|No particles are created or destroyed. Volume can change because spacing changes, but total mass stays constant if no material escapes.|Changes of state
Why is a state change physical rather than chemical?|No new substance is formed. Reversing the state change restores the original material's properties.|Changes of state
What is internal energy?|The total kinetic energy and potential energy of all particles in a system. It is not only their movement energy.|Internal energy
How does heating change internal energy?|It can increase particle kinetic energy and temperature, or increase particle potential energy during a state change.|Internal energy
What does temperature tell you about particle motion?|It is related to average kinetic energy. Higher temperature generally means particles move faster on average.|Internal energy
What is specific latent heat?|Energy needed to change the state of 1 kg of a substance with no temperature change. The unit is J/kg.|Latent heat
What is latent heat of fusion?|Energy per kilogram for solid-to-liquid change at constant temperature. Freezing transfers out the same amount for the reverse change.|Latent heat
What is latent heat of vaporisation?|Energy per kilogram for liquid-to-gas change at constant temperature. It is generally greater than latent heat of fusion for the same substance.|Latent heat
What is the latent-heat equation?|E = mL, with energy in joules, mass in kilograms and specific latent heat in J/kg.|Equations
How much energy melts 2 kg if L = 334,000 J/kg?|E = 2 × 334,000 = 668,000 J. Temperature does not rise during the ideal melting stage.|Calculation
Why is a pure substance's heating curve flat during a state change?|Energy supplied increases particle potential energy as attractions are overcome, not average kinetic energy, so temperature stays constant.|Heating curves
How do specific heat capacity and specific latent heat differ?|Specific heat capacity relates to raising temperature without a state change; specific latent heat relates to changing state without a temperature change.|Heating
What causes gas pressure?|Gas particles collide with container walls, exerting forces. Their motion is constant and random.|Gas pressure
Why does heating a fixed-volume gas increase pressure?|Particles gain kinetic energy, collide more frequently and exert a greater average force on the walls. Keep the gas mass and volume fixed for this comparison.|Gas pressure
Why does a gas not have all particles moving at one speed?|Particle speeds vary and collisions continually redistribute energy. Temperature relates to average kinetic energy, not an identical speed for every molecule.|Particle model
Why does reducing a fixed-temperature gas's volume raise its pressure?|Particles hit the walls more frequently. At fixed mass and constant temperature, pressure and volume are inversely proportional.|Gas pressure|T
What is Boyle's-law calculation for a fixed mass at constant temperature?|p₁V₁ = p₂V₂. If volume halves, pressure doubles. These conditions must be stated.|Equations|T
A gas has 100 kPa pressure at 4 dm³. What pressure at 2 dm³ at constant temperature?|p₂ = (100 × 4) ÷ 2 = 200 kPa. Use consistent pressure and volume units on both sides.|Calculation|T
Why can compressing gas in a bicycle pump warm it?|Work is done on the gas, increasing its internal energy. If this happens faster than energy is transferred out, its temperature rises.|Gas pressure|TH
`);
  topic('p4','P4 · Atomic structure','Physics',[18,1,19,20],`
What is the structure of an atom?|A tiny positive nucleus containing protons and neutrons, surrounded by negative electrons at different energy levels. Most of the atom is empty space.|Atoms
What is the approximate radius of an atom?|About 1 × 10⁻¹⁰ m. The nucleus is much smaller, with radius less than about one ten-thousandth of the atom's radius.|Atoms
Why is a neutral atom uncharged?|It has equal numbers of positive protons and negative electrons, so their charges balance.|Atoms
What is an isotope?|An atom of the same element with a different number of neutrons. Its proton number is unchanged; mass number differs.|Atoms
What is an ion?|An atom or group with an overall charge from gaining or losing electrons. Changing electron number does not change the element.|Atoms
What happens when an electron absorbs electromagnetic radiation?|It can move to a higher energy level farther from the nucleus. Moving to a lower level can emit electromagnetic radiation.|Energy levels
What evidence challenged the plum-pudding model?|Some alpha particles were strongly deflected by thin metal foil. This indicated a small concentrated positive nucleus rather than spread-out positive charge.|Atomic models
What did most alpha particles passing through foil suggest?|Atoms are mostly empty space. The rare large deflections gave evidence about the small dense nucleus.|Atomic models
How did Bohr change the nuclear model?|He proposed that electrons occupy particular energy levels at specific distances from the nucleus, supported by experimental observations.|Atomic models
What did Chadwick's experiments establish?|Evidence for uncharged neutrons in the nucleus, explaining additional nuclear mass without extra positive charge.|Atomic models
What is radioactive decay?|A random process in which an unstable nucleus changes and emits radiation to become more stable. It is a nuclear, not a chemical, change.|Radioactivity
What is activity and its unit?|The rate at which unstable nuclei decay, measured in becquerels (Bq). One Bq means one decay per second.|Radioactivity
How does count rate differ from activity?|Count rate is the number of events detected per second. The detector may not capture all emissions, so count rate is not automatically the source's full activity.|Measurement
What is an alpha particle?|Two protons and two neutrons, the same as a helium nucleus. It has charge +2 and mass number 4.|Radiation types
What is beta-minus radiation?|A high-speed electron emitted from the nucleus when a neutron changes into a proton. It is not an outer-shell electron leaving the atom.|Radiation types
What is gamma radiation?|Electromagnetic radiation emitted by the nucleus. It has no mass number or electric charge.|Radiation types
Which radiation is most ionising and least penetrating?|Alpha. It is stopped by paper or skin and travels only a short distance in air, but can be particularly hazardous inside the body.|Radiation properties
What stops beta radiation in GCSE comparisons?|A thin sheet of aluminium. Beta is more penetrating and less ionising than alpha, but less penetrating than gamma.|Radiation properties
How is gamma radiation reduced?|Thick lead or concrete reduces its intensity. It is highly penetrating and relatively weakly ionising; shielding does not mean every ray is stopped.|Radiation properties
How does alpha decay change a nucleus?|Mass number falls by 4 and atomic number falls by 2 because two protons and two neutrons are emitted.|Nuclear equations
How does beta-minus decay change a nucleus?|Mass number stays the same and atomic number rises by 1 as a neutron becomes a proton and an electron is emitted.|Nuclear equations
How does gamma emission change mass and atomic numbers?|Neither changes. The nucleus loses energy without losing protons or neutrons.|Nuclear equations
How do you balance a nuclear equation?|Make total mass numbers and total atomic numbers equal on both sides, including the emitted particle's values.|Nuclear equations
What is half-life?|The time for the number of undecayed nuclei in a sample, or its activity after background correction, to halve.|Half-life
What fraction remains after three half-lives?|½ × ½ × ½ = ⅛. Radioactive decay is random for individual nuclei, but a large sample follows a predictable pattern.|Calculation|H
An activity falls from 800 to 100 Bq in 12 hours. What is the half-life?|800 → 400 → 200 → 100 is three halvings, so half-life = 12 ÷ 3 = 4 hours.|Calculation
Why subtract background count rate?|The detector measures background as well as the source. Subtraction estimates the source count rate before finding a half-life.|Measurement
What is radioactive contamination?|Unwanted radioactive material on or inside an object. It continues emitting radiation until removed or until it decays.|Radiation hazards
What is irradiation?|Exposure to radiation from a source. The irradiated object does not itself become radioactive in the usual GCSE situations.|Radiation hazards
How can exposure to a radioactive source be reduced?|Minimise time, maximise distance and use suitable shielding and handling tools. Prevent ingestion and contamination; follow trained supervision.|Radiation safety
Why should radiation studies be published for peer review?|Other scientists can examine methods and evidence, identify problems and check conclusions. A claim about safety should be supported by reliable data.|Working scientifically
What are sources of background radiation?|Natural sources include rocks, radon and cosmic rays; human sources include medical exposure and fallout. Levels depend on location and occupation.|Background radiation|T
What is radiation dose measured in?|Sieverts (Sv), often millisieverts. 1000 mSv = 1 Sv. Dose relates to effects of exposure, not the same quantity as activity in Bq.|Radiation hazards|T
Why is a tracer isotope's half-life carefully chosen?|It must last long enough for detection but not remain active unnecessarily. Radiation should escape the body to reach a detector and the dose should be limited.|Medical uses|T
How can radiation treat cancer?|Radiation damages cells and can destroy tumour tissue. Treatment must target the tumour and limit damage to healthy tissues; benefits and risks are weighed.|Medical uses|T
What is nuclear fission?|A large nucleus splits into smaller nuclei, usually after absorbing a neutron, releasing energy and further neutrons.|Fission & fusion|T
How does a fission chain reaction develop?|Released neutrons can be absorbed by other suitable nuclei, causing more fission. In a reactor the reaction is controlled rather than allowed to grow unchecked.|Fission & fusion|T
What is nuclear fusion?|Two light nuclei join to make a heavier nucleus, releasing energy. Some mass is converted to energy; very high temperatures help overcome repulsion.|Fission & fusion|T
Why is fusion difficult to sustain on Earth?|Positively charged nuclei repel, so extremely high temperatures and confinement are required. Achieving the reaction is not the same as a practical net-power system.|Fission & fusion|T
`);
  for (const route of ['combined','triple']) {
    const subject = {id:route+'-science',name:route==='combined'?'Combined Science · AQA Trilogy':'Triple Science · AQA',route,decks:[]};
    for (const t of topics) {
      const rows = t.rows.filter(r => route==='triple' || !r.scope.includes('T'));
      subject.decks.push({id:route+'-'+t.id,title:t.title,science:t.subject,route,
        description:`AQA ${route==='combined'?'8464 Trilogy':({Biology:'8461',Chemistry:'8462',Physics:'8463'}[t.subject])} · ${t.subject} Paper 1. Based on your school files, with corrected original explanations. Higher-only cards are labelled.`,
        sources:t.sources,
        cards:rows.map((r,i)=>({id:route+'-'+t.id+'-'+String(t.rows.indexOf(r)+1).padStart(2,'0'),question:r.question,answer:r.answer,
          exam:r.focus==='Calculation'?'Show the equation, substitution, result and unit. Check rounding against the question.':r.focus==='Required practical'?'Explain why each control or measurement is needed, not just the steps. Practicals must follow school safety guidance.':'Answer the exact command word. Link a named structure or process to its effect, using the information given.',
          tags:[r.focus,...(r.scope.includes('H')?['Higher only']:[]),...(r.scope.includes('T')?['Triple only']:[])],tier:r.scope.includes('H')?'H':'both',sourceIds:t.sources}))});
    }
    window.FLASHCARD_DATA.subjects.push(subject);
  }
})();
