// Original, misconception-focused AQA Paper 1 recall questions, reviewed 2026-10-03.
// Authority: AQA 8464 Biology §§4.1–4.4 / Physics §§6.1–6.4;
// AQA 8461 §§4.1–4.4; AQA 8463 §§4.1–4.4, with separate-science additions.
// https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/biology-subject-content
// https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/physics-subject-content
// https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/specification/subject-content
// https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/specification/subject-content
// June 2024 Foundation mark schemes (board-published CDN):
// https://cdn.sanity.io/files/p28bar15/green/4581d897772bc703cdb6d169c6f52f61236b5fbd.pdf
// https://cdn.sanity.io/files/p28bar15/green/6dd51395af97c58fbc196d347572788fe2c02362.pdf
// Load after expanded-cards.js. Only quiz properties change: card IDs, full answers,
// sources, tier labels and saved ratings are retained. Option zero is correct;
// app.js shuffles display order. The existing card answer supplies the explanation.
(() => {
  'use strict';
  const sets = {};
  const triples = {};
  function rows(text) {
    return text.trim().split('\n').map(line => {
      const [suffix, question, ...options] = line.split('|');
      if (options.length !== 4 || new Set(options).size !== 4 || options.some(v => !v.trim())) {
        throw new Error('Invalid Biology/Physics quiz options: ' + suffix);
      }
      return {suffix, question, options};
    });
  }
  function topic(id, text) { sets[id] = rows(text); }
  function separate(id, omitted, text) { triples[id] = {omitted, additions: rows(text)}; }

  topic('b1', `
01|What distinguishes bacterial cells from typical plant and animal cells?|Their DNA is not enclosed in a nucleus|They have no genetic material|They contain chloroplasts instead of DNA|Their DNA is enclosed in a larger nucleus
02||Contains genetic material and controls cell activities|Controls movement across the cell surface|Is the main site of protein synthesis|Absorbs light for photosynthesis
03||Many of the cell's chemical reactions|Storage of all DNA inside a separate nucleus|Production of cellulose outside the cell|Photosynthesis in all animal cells
04||Controls movement of substances into and out of the cell|Makes proteins from amino acids|Contains all the cell's chromosomes|Absorbs light using chlorophyll
05||Most aerobic respiration|Protein synthesis|Photosynthesis|Storage of cell sap
06||Protein synthesis|Aerobic respiration|Photosynthesis|Control of substances entering the cell
07||Cellulose|Chlorophyll|Glycogen|Starch
08||Absorb light for photosynthesis|Transfer energy by most aerobic respiration|Control all substances entering the cell|Join amino acids into proteins
10||In a DNA loop in the cytoplasm, with possible plasmids|Inside a membrane-bound nucleus|Only inside mitochondria|Only in a permanent vacuole
11|Which adaptation helps a sperm cell swim towards an egg?|A tail|A cellulose wall|Chloroplasts|A large permanent vacuole
12|How does a long axon help a nerve cell?|It carries electrical impulses over long distances|It absorbs mineral ions from soil|It stores glucose as starch|It makes the cell contract
13||Contraction needs energy transferred by respiration|Mitochondria store the cell's chromosomes|Mitochondria absorb sunlight|Muscle cells use mitochondria to make cellulose
14|How does a root hair cell's long projection help absorption?|It gives a large surface area|It encloses DNA in a nucleus|It shortens the plant's roots|It makes water enter by active transport
15||Development of specialised structures for a particular function|Division into two genetically identical cells|Movement of water through a membrane|Replication of DNA before every chemical reaction
16||Image size divided by actual size|Actual size divided by image size|Image size multiplied by actual size|Image size added to actual size
17||×400|×40|×100|×1000
18||1000 µm|10 µm|100 µm|1 000 000 µm
19||Ability to distinguish two nearby points as separate|The size of an image compared with the object|The number of cells on a slide|The amount of stain used
20||They have higher resolving power than light microscopes|They simply use more stain|They make every specimen alive|They only enlarge existing blurred pixels
22||DNA molecules carrying genes|Proteins that digest food|Small rings of cell sap|Membranes surrounding mitochondria
23||The cell grows and its DNA is replicated|The chromosome number is halved before growth|All chromosomes are destroyed|Two gametes fuse
24||Two genetically identical daughter cells|Four genetically different gametes|One cell with half the chromosomes|Two cells with no chromosomes
25||Growth and repair of tissues|Production of gametes by halving chromosomes|Movement of water across membranes|Digestion of proteins
26||An undifferentiated cell that can divide and specialise|A fully specialised cell that can never divide|A cell with no genetic information|Only a cell found in plant stems
27||Embryonic stem cells can form a wider range of cell types|Adult bone-marrow stem cells can form every cell type|Embryonic stem cells cannot differentiate|Both types can only become nerve cells
29||Net movement from higher to lower concentration|Net movement from lower to higher concentration using energy|Movement of only water through any barrier|Movement that stops all particle motion at equilibrium
30||Net movement of water through a partially permeable membrane from dilute to concentrated solution|Net movement of mineral ions against their gradient|Net movement of proteins through a cell wall using energy|Net movement of water from concentrated to dilute solution
31||Movement against a concentration gradient using energy|Net movement down a gradient without energy input|Only the movement of water through a membrane|The same process as all diffusion
32||Their small surface-area-to-volume ratio makes outer-surface exchange insufficient|They have no cell membranes|Their surface-area-to-volume ratio is always larger|All their cells are directly exposed to outside air
33|Why blot potato pieces dry before weighing in an osmosis investigation?|Remove surface solution so it does not distort mass readings|Remove all water inside the cells|Stop osmosis permanently|Increase the concentration of the sugar solution
`);
  separate('b1', ['08', '18', '32'], `
37||Binary fission|Mitosis in a membrane-bound nucleus|Fusion of two gametes|Formation of four spores by meiosis
38||To reduce the chance of growing dangerous human pathogens|To kill every bacterium before it divides|To make all bacteria grow as fast as possible|To prevent all oxygen entering the plate
41||To allow oxygen to enter and reduce growth of harmful anaerobes|To allow people to open plates during incubation|To make the agar dry out completely|To let the cultured bacteria escape
`);

  topic('b2', `
01||Cells → tissues → organs → organ systems → organism|Cells → organs → tissues → organism → organ systems|Tissues → cells → organs → organism → organ systems|Organs → tissues → cells → organ systems → organism
02||A group of cells with a similar structure and function|A group of different organ systems|One specialised cell on its own|Any collection of unrelated organisms
04||To make small soluble molecules that can be absorbed|To make all food insoluble|To change every nutrient into an enzyme|To move food into the lungs
05||A biological catalyst with a specific active site|A reactant that is used up in every reaction|A microorganism that causes disease|A substance that always works at every temperature
06||The active site's shape changes so the substrate no longer fits|The enzyme is killed like a living cell|The substrate becomes an enzyme|The enzyme's active site becomes more specific forever
07||More kinetic energy leads to more successful collisions|All enzymes denature immediately when warmed|The substrate concentration must always fall to zero|Higher temperature removes the enzyme's active site
08||Each enzyme has an optimum pH and large deviations can change its active site|Every enzyme works fastest at pH 7|pH affects substrates but never enzymes|An enzyme's rate always rises as pH rises
09||Starch into sugars|Proteins into amino acids|Lipids into fatty acids and glycerol|Cellulose into oxygen
10||Proteins into amino acids|Starch into sugars|Lipids into fatty acids and glycerol|Glucose into starch
11||Lipids into fatty acids and glycerol|Proteins into sugars|Starch into amino acids|Fatty acids into oxygen
12||Made in the liver and stored in the gall bladder|Made in the gall bladder and stored in the liver|Made and stored in the stomach|Made in the pancreas and stored in the lungs
13||Neutralises acid and emulsifies fat to increase surface area|It is an enzyme that turns fat directly into glucose|Makes the small intestine more acidic|Combines small fat droplets into larger droplets
14||Orange-brown iodine turns blue-black|Blue Benedict's reagent turns purple without heating|Biuret reagent turns orange-brown|Iodine remains orange-brown
15|How should Benedict's reagent be used to test for reducing sugar?|Heat with the sample in a hot-water bath and look for a colour change from blue|Add iodine and look for a blue-black colour|Use Biuret reagent and look for purple|Add Benedict's reagent without heating and look for a red oil layer
16||Biuret reagent changes from blue to lilac or purple|Iodine changes to blue-black|Benedict's reagent stays blue when heated|Sudan III produces a red oil layer
18|What is the endpoint in the starch–amylase pH practical?|Iodine stays orange-brown because the starch has been digested|Iodine becomes blue-black because all starch has been digested|The enzyme boils away|Every solution changes to purple
20||Blood passes through the heart twice per complete body circuit|Blood passes through the heart once per complete circuit|Blood never returns from the lungs|Oxygenated and deoxygenated blood mix freely in one chamber
21||Right to lungs; left to the rest of the body|Right to the rest of the body; left to lungs|Both only to the lungs|Both only to the liver
22|Which vessel carries blood from the lungs to the heart?|Pulmonary vein|Pulmonary artery|Aorta|Vena cava
23||Arteries carry blood away; veins carry blood towards the heart|Arteries always carry oxygenated blood; veins always deoxygenated|Arteries contain valves throughout; veins never have valves|Veins have thicker muscular walls than arteries
24||A short diffusion distance allows rapid exchange|Thick walls stop all exchange|A one-cell wall pumps blood at high pressure|Thin walls prevent blood from flowing
25||Large surface area, thin walls, ventilation and a good blood supply|Small surface area, thick walls and no blood supply|Thick dry walls and no ventilation|A cellulose wall with no capillaries
26|Which blood component carries oxygen?|Red blood cells|Platelets|White blood cells|Plasma alone without red cells
27|Why is the lack of a nucleus useful in a mature human red blood cell?|It leaves more room for haemoglobin|It allows the cell to photosynthesise|It makes the cell produce antibodies|It lets the cell divide by mitosis
28||Fatty deposits narrow coronary arteries, reducing oxygen supply to heart muscle|Blood glucose is too low for all arteries to exist|Viruses always destroy the heart valves|Coronary veins become filled with air
30||Malignant tumours invade and may spread; benign tumours remain contained|Benign tumours always spread faster than malignant tumours|All tumours are malignant cancers|Malignant tumours contain only normal cells
32||Xylem carries water and ions; phloem carries dissolved sugars|Xylem carries dissolved sugars; phloem carries only oxygen|Both are made entirely of dead hollow cells|Phloem is the main route for water from roots
33||Loss of water vapour mainly through leaf stomata|Movement of dissolved sugars in phloem|Absorption of mineral ions by photosynthesis|Release of glucose through roots
34|Which change usually increases transpiration if other conditions stay constant?|Lower humidity|Less air movement|Lower temperature|Lower light intensity causing stomata to close
35||Open and close stomata to regulate gas exchange and water loss|Make xylem carry sugars|Transport all water by active transport|Produce antibodies against plant pathogens
`);

  topic('b3', `
01||A microorganism that causes disease|Any organism that lives in soil|An antibody made by white blood cells|A medicine that kills bacteria
02||A pathogen-caused disease that can spread between organisms|Any disease caused by inherited alleles|A disease caused only by lifestyle|A condition that can never pass between organisms
03|Which route can transmit a pathogen?|Contaminated water|Only changes in body temperature|Only inherited genes|Only a low-protein diet
04||They may multiply and release toxins that damage tissues|Every bacterium destroys cells by photosynthesis|They are all viruses living inside nuclei|They remove all antibodies by osmosis
05||They reproduce inside host cells and damage them|They digest food in the stomach without entering cells|They all produce their own antibiotics|They become white blood cells
06||A virus spread in droplets from coughs and sneezes|A bacterium spread only by mosquito bites|A fungus spread by sexual contact|A protist spread only by polluted food
07||HIV can damage immune cells, leaving the body vulnerable to other infections|HIV turns all bacteria into viruses|HIV only damages red blood cells and never immune cells|AIDS is a different pathogen that always replaces HIV
08|Which statement about HIV transmission is correct?|Infected blood or sexual contact can transmit HIV; ordinary social contact does not|Sharing a classroom normally transmits HIV through air|Antibiotics prevent every HIV infection|Antiretroviral drugs make HIV spread by touch
09||Leaf discolouration reduces photosynthesis and growth|It increases chlorophyll and doubles photosynthesis|It only affects animal red blood cells|It is a bacterial disease of roots only
10||Salmonella bacteria in contaminated food|A virus transmitted by mosquito bites|A fungal pathogen carried only in air|An inherited change in a digestive enzyme
11||A bacterium spread by sexual contact|A virus spread only by coughing|A fungus spread only by water|A protist spread by mosquito bites
12||A fungus that can reduce photosynthesis as leaves are damaged|A virus that produces human antibodies|A bacterium that improves leaf growth|A protist spread only by mosquito bites
13||A protist is the pathogen; a mosquito is the vector|A mosquito is the pathogen; a virus is the vector|A bacterium is the pathogen; a fungus is the vector|A virus is the pathogen; a protist is the vector
14||Mosquito nets and reducing mosquito breeding sites|Giving antibiotics to every plant leaf|Increasing stagnant water near homes|Removing all red blood cells from patients
15||They reduce pathogen transfer and contact between infected and susceptible people|They make every person immune without exposure|They turn all pathogens into harmless antibodies|They prevent only inherited diseases
16||A physical barrier, with clotting sealing wounds|It produces hydrochloric acid over its whole surface|It replaces all damaged white blood cells|It absorbs every pathogen into the blood
17||Hairs and mucus trap pathogens; cilia move mucus away from lungs|Cilia make stomach acid; mucus carries pathogens into alveoli|Nasal hairs make antibodies for every virus|Mucus has no role in trapping particles
18||Hydrochloric acid destroys many swallowed pathogens|Bile in the stomach digests all viruses|The stomach makes every antibody|Stomach walls filter every pathogen from the blood
19||A white blood cell engulfs and digests a pathogen|An antibody turns into a new pathogen|A platelet secretes insulin|A red blood cell makes antibiotics
20||They bind to specific antigens and help target a pathogen|One antibody binds equally well to every antigen|They supply oxygen to infected cells|They are poisons released by bacteria
21||Neutralise toxins released by some bacteria|Digest every virus outside cells|Transfer oxygen around the body|Cause bacterial toxins to multiply
22||A later encounter produces a faster specific antibody response|Vaccines are antibiotics stored permanently in the blood|Vaccines replace every immune cell|Vaccines guarantee protection against every unrelated disease
23||Fewer susceptible hosts can make spread less likely|It makes all pathogens unable to reproduce anywhere|It guarantees that no vaccinated person can ever be infected|It removes the need for all other precautions
24||Antibiotics target bacterial structures or processes that viruses lack|Viruses are too large for any medicine|Antibiotics only work at room temperature|Viruses contain thicker cell walls than bacteria
25||Resistant bacteria survive treatment and reproduce|All bacteria choose to change when they detect a drug|Antibiotics directly turn viruses into bacteria|Every susceptible bacterium becomes resistant before treatment
26||Painkillers relieve symptoms; antibiotics act against susceptible bacteria|Painkillers kill all pathogens; antibiotics only reduce pain|Both always kill viruses|Both are identical types of vaccine
28||Toxicity, efficacy and appropriate dose|Colour, smell and packaging alone|Only whether it tastes pleasant|Only whether it is extracted from a plant
29||Preclinical tests on cells, tissues and animals before clinical trials in people|Clinical trials in patients before any laboratory testing|Testing only the final packaging|Giving the maximum dose to all volunteers first
30||A control treatment without the active drug|A stronger version of the active drug|An antibiotic used to treat every virus|A vaccine that produces antitoxins immediately
31||To reduce patient expectation and researcher bias|To avoid recording any results|To guarantee that the drug works|To make both groups receive the active drug
`);
  separate('b3', ['04', '15', '30'], `
38|Which ion is needed to make chlorophyll, so its deficiency can cause chlorosis?|Magnesium|Nitrate|Phosphate|Potassium
39|Which is a physical plant defence against pathogens?|A waxy cuticle|Antibacterial chemicals|Poisons that deter herbivores|Nitrate ions absorbed from soil
40|Which plant adaptation can deter herbivores mechanically?|Thorns|Antibacterial chemicals alone|Nitrate absorption|Photosynthesis
`);

  topic('b4', `
01||Carbon dioxide + water → glucose + oxygen|Glucose + oxygen → carbon dioxide + water|Glucose → lactic acid|Glucose → ethanol + carbon dioxide
02||6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂|6CO₂ + O₂ → C₆H₁₂O₆ + H₂O|C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O|CO₂ + H₂O → O₂ without glucose
03||Energy from light is transferred into the reaction products|The plant creates energy from nothing|It only happens when the surroundings lose carbon atoms|It releases more heat than it absorbs
04||In chloroplasts containing chlorophyll|In animal ribosomes|Only in the nucleus|Only in root-hair mitochondria
05||Rate can rise with light intensity until another factor restricts it|Rate always doubles whenever light intensity doubles|Light has no effect because photosynthesis does not need energy|A plateau means all photosynthesis has stopped
06||More carbon dioxide can raise the rate until another factor restricts it|Carbon dioxide is only a product, so adding it can never help|Removing carbon dioxide always increases the rate|Carbon dioxide destroys all chlorophyll
07||Rate can rise towards an optimum, then fall as enzymes denature|Rate increases without limit at every temperature|All photosynthetic enzymes are killed below 20°C|Temperature cannot affect any plant reaction
08||Less chlorophyll means less light energy is absorbed|Chlorophyll is the carbon dioxide reactant|Less chlorophyll always increases oxygen production|Chlorophyll only has a role in respiration
14||Light intensity; estimate rate using oxygen produced per unit time|The colour of the ruler; estimate rate using water lost|The pondweed species; estimate rate using only lamp temperature|Only carbon dioxide volume added; ignore oxygen
15|Which variable should stay constant when investigating light intensity with pondweed?|Water temperature|The light intensity being tested|The lamp distance being varied|The oxygen volume measured as the outcome
16||Bubbles can differ in size, so volume gives a more comparable measure|Counting bubbles always gives the same result as volume|Oxygen has no volume|Measuring volume removes every possible experimental error
17||3 cm³/min|48 cm³/min|0.33 cm³/min|8 cm³/min
18||To reveal variation and calculate a more reliable mean|To guarantee that all readings are identical|To remove the need for controlled variables|To discard every result lower than expected
19||Respiration breaks it down to transfer energy for cell processes|Respiration turns it directly into chlorophyll without energy transfer|Plants never use glucose in respiration|Glucose supplies energy only in darkness
20||Starch is insoluble and has less osmotic effect than soluble glucose|Starch diffuses out of cells faster than glucose|Starch is a gas that escapes through stomata|Starch has no role in storing materials
21|Which mineral ions do plants need, alongside glucose-derived materials, to make amino acids?|Nitrate ions|Chloride ions only|Hydrogen ions only|Lead ions
22||Fats and oils|Only oxygen gas|Only carbon dioxide gas|Antibodies
23||Exothermic reactions in cells transferring energy from glucose|The movement of air in and out of lungs only|A reaction that stores light energy as glucose|The diffusion of oxygen through stomata only
24||Glucose + oxygen → carbon dioxide + water|Carbon dioxide + water → glucose + oxygen|Glucose → ethanol + oxygen|Lactic acid + oxygen → chlorophyll
25||C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O|6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂|C₆H₁₂O₆ → 6O₂ without other products|C₆H₁₂O₆ + H₂O → chlorophyll
26||Incomplete glucose breakdown to lactic acid without oxygen|Complete glucose breakdown to water without oxygen|Conversion of glucose to ethanol in human muscles|Conversion of lactic acid to oxygen in human muscles
27||Ethanol and carbon dioxide|Lactic acid and oxygen|Water and oxygen only|Urea and starch
28||To deliver more oxygen and glucose and remove carbon dioxide faster|To stop all respiration in muscles|To keep oxygen away from muscles|To replace muscles with red blood cells
29||Anaerobic respiration can occur and lactic acid can accumulate|All respiration stops immediately|Muscle cells start photosynthesising|Human muscles make ethanol instead of lactic acid
32||All chemical reactions in a cell or organism|Only breathing movements|Only digestion in the stomach|Only reactions that make large molecules
33||Amino acids form proteins; glycerol and fatty acids form lipids|Fatty acids form proteins; amino acids form lipids|Glucose directly forms all proteins without nitrogen|Proteins form only from glycerol
34||Urea is formed for excretion|All excess proteins are stored unchanged forever|All excess proteins become oxygen gas|The cell stops every metabolic reaction
extension-02||Yes, living plant cells respire during day and night|No, plants only respire at night|No, only animals respire|Only if photosynthesis has completely stopped
extension-03||Nitrate ions supply nitrogen needed to make amino acids|Nitrate ions supply the light used by chlorophyll|Nitrates are enzymes that digest starch|Nitrates replace the need for glucose
extension-15||3.0 cm³/min|9.0 cm³/min|1.0 cm³/min|3.2 cm³/min
`);

  topic('p1', `
01|Which of these is an energy store?|Kinetic|Heating|Radiation|Mechanical work
02||Mechanically, electrically, by heating and by radiation|Kinetic, thermal, chemical and nuclear|Mass, volume, density and temperature|Current, charge, resistance and potential difference
03||An object or group of objects chosen for study|Only an object that is electrically charged|A unit used to measure power|A type of renewable fuel
04||Total energy in a closed system stays constant|Energy disappears when it is dissipated|Useful devices create more energy than they receive|Thermal energy is not included in conservation
05||The book's gravitational potential store increases as work is done|The book creates new nuclear energy|The person's chemical store increases without any input|The book's gravitational potential store must decrease
06||Kinetic energy decreases while thermal stores increase|The car's kinetic energy is destroyed|Thermal energy changes entirely into gravitational potential energy|Friction creates energy from nothing
07||Gravitational potential energy decreases and kinetic energy increases|Kinetic energy decreases and gravitational potential energy increases|All energy remains only in a chemical store|The object's energy is not conserved
08||Chemical energy in the battery is transferred electrically, then by light and heating|The battery supplies a store called electrical radiation|The lamp creates energy with no input|All input energy remains in the battery unchanged
09||Energy spread into less useful stores, often surroundings' thermal stores|Energy that has been destroyed|Energy that violates conservation|Only energy stored in the nucleus
10||It reduces friction and unwanted transfer to thermal stores|It creates extra energy for the machine|It makes all moving surfaces rougher|It prevents any useful motion
11||It reduces the rate of energy transfer by heating|It produces heat continuously without an energy source|It destroys thermal energy|It changes all thermal energy into nuclear energy
13||9 J|3 J|6 J|18 J
14||Four times as large for the same mass|Twice as large for the same mass|Half as large for the same mass|Unchanged for the same mass
16||100 J|10 J|20 J|1000 J
17||Eₑ = ½ke², within the limit of proportionality|Eₑ = ke, for all possible extensions|Eₑ = k/e²|Eₑ = ½k²e
18||0.5 J|5 J|10 J|50 J
19||Energy needed to raise 1 kg by 1°C|Energy needed to melt any mass at constant temperature|Mass per unit volume|Temperature change per second
20||ΔE = mcΔθ|ΔE = m/cΔθ|ΔE = mc/Δθ|ΔE = cΔθ/m
21||Rate of energy transfer or work done|Total energy transferred regardless of time|Force multiplied by mass|Energy stored per kilogram
22||20 W|600 W|18 000 W|0.05 W
23||The motor completing the work in less time|The motor taking longer|Both must have equal power because work is equal|The one with a darker casing
24||Useful output divided by total input|Total input divided by useful output|Useful output added to total input|Wasted output divided by useful output in every case
25||80%|20%|125%|0.8%
26||It is replenished, or can be replenished, as it is used|It produces no environmental effects of any kind|Its supply is always constant at every moment|It cannot be used for heating
27|Which pair contains only non-renewable energy resources?|Natural gas and nuclear fuel|Wind and tidal energy|Sunlight and geothermal energy|Hydroelectricity and waves
28||Wind speed and sunlight vary with conditions|Wind turbines and solar panels always run out of fuel after one day|Solar panels produce most energy at night|Wind speed is constant everywhere
29||Carbon dioxide from burning them contributes to climate change|Burning them removes all greenhouse gases|They have no extraction impacts|All their emissions are oxygen only
30||Low operational carbon emissions, but radioactive waste and other risks require consideration|No waste or decommissioning needs|Nuclear fuel is a rapidly replenished renewable resource|Nuclear stations produce electricity only when it is sunny
32||Costs, public views and policy can affect whether scientific options are adopted|Science alone automatically decides every policy|All energy resources have identical costs|Political choices change the law of energy conservation
33|Which measurements are needed to calculate a block's specific heat capacity?|Mass, energy supplied and temperature rise|Length, colour and starting time only|Resistance, pressure and volume only|Final temperature alone
`);
  separate('p1', ['32'], `
34|How should insulating materials be compared fairly?|Keep liquid volume, container and starting temperature the same, then compare cooling over equal times|Use different starting temperatures for each material|Compare materials using different amounts of liquid and no timing|Measure one material only and assume the others are identical
`);

  topic('p2', `
01||Rate of flow of electric charge, measured in amperes|Energy transferred per coulomb, measured in volts|Charge stored per second, measured in ohms|Total resistance measured in joules
03||60 C|15 C|32 C|0.067 C
04||Energy transferred per unit charge|Charge transferred per unit energy|Current multiplied by time|Resistance divided by current
05||Opposition to current, measured in ohms|Energy transferred per second, measured in watts|Charge transferred per second, measured in volts|Total charge stored, measured in amperes
07||3 Ω|12 Ω|8 Ω|0.33 Ω
08||In series so the component's current flows through it|In parallel directly across the power supply|In parallel across the component|Only outside the circuit without electrical connections
09||In parallel across the component|In series so all current must pass through it|In series with the power supply only|Across an open switch instead of the component in every case
10||Current proportional to p.d. at constant temperature|Current always independent of p.d.|Resistance always decreases when p.d. rises|An I–V graph that must curve away from the origin
11||Hotter ions vibrate more, increasing collisions with electrons|Heating removes every ion from the wire|Higher temperature always decreases every conductor's resistance|Current changes into protons inside the filament
12||It allows current mainly in one direction|It carries the same current equally in both directions at every p.d.|It stores energy as chemical fuel|It measures potential difference in volts
13||Resistance decreases|Resistance increases|Resistance always stays constant|It changes into an LDR
14||Resistance decreases|Resistance increases|It produces unlimited current without a power supply|It becomes a perfect insulator
15||The same current flows at every point|Current is used up by each component|Current doubles after every resistor|Current is zero after the first lamp even in a working circuit
16||Component p.d.s add to the supply p.d.|Every component always gets the full supply p.d.|Each component's p.d. must equal its current|The supply p.d. becomes zero as soon as current flows
17||Add the individual resistances|Multiply every resistance by the current|Use only the smallest resistance|Subtract every resistance from the supply voltage
18||Branch currents add to the total supply current|Every branch must always have the full supply current|Current is destroyed at each junction|Current never divides between branches
19||The same p.d. across branches connected to the same two points|Supply p.d. is divided equally between branches in every case|The branch with greatest resistance has zero p.d.|P.d. must increase after each branch
20||It provides an additional path for charge|It makes every original resistor more resistive|It removes the potential difference from every branch|It turns the circuit into a single series path
21||DC flows one way; AC repeatedly reverses direction|DC repeatedly reverses; AC flows one way|Both must reverse direction 50 times per minute|DC has no electric charge
22||About 230 V, 50 Hz AC|About 12 V, 50 Hz DC|About 230 V, 50 Hz DC|About 50 V, 230 Hz AC
23||Live brown; neutral blue; earth green-and-yellow|Live blue; neutral brown; earth green-and-yellow|Live green-and-yellow; neutral blue; earth brown|Live brown; neutral green-and-yellow; earth blue
24||It provides a fault-current path from a metal case so protection can disconnect the supply|It normally carries all operating current instead of live|It stops a fuse melting during a fault|It makes a metal case deliberately live
25||Excess current heats and melts the fuse wire, breaking the circuit|It absorbs any amount of current without heating|It continuously supplies extra current to the appliance|It is fitted only in the earth wire to increase voltage
27||P = VI, or P = I²R for a resistive component|P = V/I, or P = I/R|P = V + I|P = I/R²
28||24 W|6 W|14 W|0.17 W
30||6000 J|60 J|100 J|1.67 J
31||For the same power, higher p.d. means lower current and less cable heating|Higher p.d. means larger current for the same power|High p.d. eliminates cable resistance completely|High p.d. creates energy inside the wires
32||Step-up raises p.d. for transmission; step-down lowers it for consumers|Step-up lowers p.d.; step-down raises it|Both convert AC into DC without changing p.d.|Both create more power than enters them
33|What should be controlled when investigating how wire length affects resistance?|Material, thickness and temperature|Wire length itself as the independent variable|Current and p.d. as the only quantities to ignore|Only the colour of the measuring instruments
34|How should an I–V characteristic be measured?|Vary p.d., measure current through and p.d. across the component|Put both meters in parallel and keep all p.d.s zero|Measure current across the component and p.d. through it|Use one resistance reading and assume a straight graph for every component
`);
  separate('p2', ['20', '21', '23'], `
36||Electrons move; gaining electrons makes an object negative|Protons move between objects; gaining protons makes an object negative|Neutrons move between objects; gaining neutrons makes an object positive|Rubbing creates equal numbers of protons in both objects
37||Like charges repel; unlike charges attract|Like charges attract; unlike charges repel|All charges repel regardless of sign|Charged objects only exert forces when touching
39||Away from positive and towards negative, following force on a positive test charge|Towards positive and away from negative, following a positive test charge|In circles around every isolated stationary charge|Always from negative to positive for a positive test charge
`);

  topic('p3', `
01||Closely packed, vibrating about fixed positions|Far apart and moving freely through the whole container|Close together and moving past one another freely|Motionless with no kinetic energy at any temperature
02||Close together, able to move past one another|In fixed positions that cannot change neighbours|Far apart with a fixed shape|In a regular lattice that keeps its own shape
03||Far apart, moving rapidly in random directions|Closely packed at fixed positions|Close together with a fixed volume|All arranged in identical stationary rows
04||Particles are usually farther apart, so each volume contains less mass|Every gas particle has zero mass|Gas particles are always larger than solid particles|Gases contain no particles
05||Density = mass ÷ volume|Density = volume ÷ mass|Density = mass × volume|Density = mass + volume
06||4 g/cm³|250 g/cm³|0.25 g/cm³|4 kg/m³
07||0.002 m³|500 m³|18 000 m³|2 m³
08||Length × width × height|Length + width + height|Mass ÷ length|Length × width only
09||Measure the liquid volume displaced when it is fully submerged|Measure only its longest length|Assume it has the same volume as its container|Divide its mass by the room temperature
10||Subtract empty-container mass, then divide liquid mass by its volume|Use container-plus-liquid mass without subtraction|Divide volume by the liquid mass|Use the empty container's mass alone
12||Divide by 1 000 000|Divide by 100|Multiply by 1000|Multiply by 1 000 000
13||Solid to liquid|Liquid to gas|Gas to liquid|Liquid to solid
14||Liquid to solid|Solid to gas|Gas to liquid|Solid to liquid
15||Gas to liquid|Liquid to solid|Solid to gas|Liquid to gas
16||Boiling is throughout liquid at its boiling point; evaporation is at the surface and can occur below it|Both occur only at the surface at the boiling point|Evaporation only happens above the boiling point|Boiling is a chemical reaction while evaporation creates a new substance
17||Solid directly to gas|Gas directly to liquid|Solid to liquid only|Liquid directly to solid
18||No particles are created or destroyed in a closed sample|Particles lose their mass when they move farther apart|New particles are always made during boiling|Volume must stay constant in every state change
19||No new substance forms and the change can be reversed|The original atoms turn into a new element|The substance always reacts with oxygen|Mass is destroyed when the temperature changes
20||Total kinetic and potential energy of all particles|Only the kinetic energy of the fastest particle|Only the gravitational potential energy of the container|Temperature multiplied by volume in every case
21||It can increase kinetic energy or change potential energy during a state change|It can only raise temperature and never change state|It always decreases total internal energy|It destroys particles to provide heat
22||It is related to the particles' average kinetic energy|It gives the exact speed of every particle|It measures the mass of each individual particle|It tells you only the number of particles
23||Energy needed to change the state of 1 kg without changing temperature|Energy needed to raise 1 kg by 1°C|Mass contained in 1 m³|Energy transferred per second
24||Energy per kilogram for melting at constant temperature|Energy per kilogram for liquid to gas only|Energy per degree for heating a solid|Force per unit area during melting
25||Energy per kilogram for liquid-to-gas change at constant temperature|Energy per kilogram for solid to liquid only|Energy needed to warm any mass by 1°C|The speed of particles leaving a liquid
26||E = mL|E = L/m|E = m/L|E = m + L
27||668 000 J|167 000 J|334 000 J|668 J
28||Energy changes particle potential energy rather than increasing average kinetic energy|The heater has stopped transferring any energy|Every particle has stopped moving|All the energy is destroyed during melting
29||Specific heat capacity concerns temperature rise; latent heat concerns change of state|Both describe exactly the same process|Specific heat capacity is measured only during boiling|Latent heat always raises temperature without a state change
30||Gas particles collide with container walls and exert forces|Gas particles attract only the bottom of the container|Pressure occurs because all particles are motionless|Pressure requires a liquid inside every gas container
31||At fixed mass and volume, hotter particles exert a greater average force on the walls|Heating always removes particles from a sealed container|Gas particles become more massive as temperature rises|The walls stop particles colliding when warm
`);
  separate('p3', ['03', '12', '29'], `
33||Particles strike walls more frequently when the same gas occupies less volume|All particles gain mass as volume falls|The gas loses every particle at constant temperature|The temperature must double whenever volume halves
34||p₁V₁ = p₂V₂, for fixed gas mass at constant temperature|p₁/V₁ = p₂/V₂, for fixed gas mass at constant temperature|p₁ + V₁ = p₂ + V₂ in every case|p₁V₂ = p₂V₁ with no conditions required
35||200 kPa|50 kPa|100 kPa|400 kPa
`);

  topic('p4', `
01||A small positive nucleus with protons and neutrons, surrounded by electrons|A negative nucleus surrounded by protons|A solid ball with no internal space|Electrons and protons all fixed in the same outer shell
02||About 1 × 10⁻¹⁰ m|About 1 × 10⁻² m|About 1 × 10² m|About 1 m
03||Equal numbers of protons and electrons balance charge|Equal numbers of protons and neutrons balance charge|All particles in an atom have zero charge|The electron mass cancels the nucleus mass
04||Same proton number but a different neutron number|Same neutron number but a different proton number|Only a different electron number|An atom with no nucleus
05||An atom or group charged by gaining or losing electrons|An atom that changes element by losing an electron|An atom with a different neutron number only|Any atom with equal protons and electrons
06||It can move to a higher energy level|It must enter the nucleus and become a proton|It always disappears|It can only move to a lower energy level
07||Rare large alpha-particle deflections suggested concentrated positive charge|Every alpha particle was absorbed without exception|The foil produced only neutrons|No alpha particles passed through the foil
08||Most of an atom is empty space|The atom is solid throughout|Electrons have the same mass as the nucleus|Positive charge fills the entire atom uniformly
09||Electrons occupy particular energy levels|Neutrons are negatively charged|All electrons sit inside the nucleus|Atoms contain no charged particles
10||Evidence for uncharged neutrons in the nucleus|Discovery that electrons have positive charge|Proof that protons orbit the nucleus|Proof that every atom has no empty space
11||Random change of an unstable nucleus with emitted radiation|A chemical reaction involving outer electrons only|A process caused only by raising temperature|A predictable schedule for each individual nucleus
12||Decays per second, in becquerels|Energy per kilogram, in joules|Detected counts per minute, always equal to source activity|Radiation penetration distance, in metres
13||Count rate is detected events; the detector may miss some emissions|Count rate always equals total source activity exactly|Count rate measures the mass of the source|Count rate is the same quantity as radiation dose
14||Two protons and two neutrons|One high-speed electron|An electromagnetic wave with no charge|One neutron and no protons
15||A high-speed electron emitted when a neutron becomes a proton|A low-speed proton emitted from an electron shell|Two protons and two neutrons|An electromagnetic wave with no charge
16||Electromagnetic radiation with no mass number or charge|A helium nucleus with charge +2|A high-speed electron|A neutron ejected from an electron shell
17||Alpha|Beta|Gamma|They all have identical penetration and ionisation
18||A thin sheet of aluminium|Only thick lead or concrete|Vacuum with no shielding|Nothing can reduce beta radiation
19||Thick lead or concrete reduces its intensity|One sheet of paper completely stops all gamma rays|A magnetic field turns it into alpha particles|Gamma has a negative charge that makes shielding impossible
20||Mass number −4; atomic number −2|Mass number −2; atomic number −4|Mass number unchanged; atomic number +1|Both numbers unchanged
21||Mass number unchanged; atomic number +1|Mass number −4; atomic number −2|Mass number +1; atomic number unchanged|Mass number unchanged; atomic number −1
22||Neither mass number nor atomic number changes|Mass number falls by 4|Atomic number rises by 1|Both numbers become zero
23||Balance both total mass number and total atomic number|Balance only the chemical state symbols|Balance only the number of electrons outside atoms|Make daughter and parent have identical proton numbers after every decay
24||Time for undecayed nuclei, or background-corrected activity, to halve|Time for every individual nucleus to decay|Time for the source to stop emitting completely|Time for activity to double
26||4 hours|12 hours|3 hours|1.5 hours
27||To estimate the count rate due to the source alone|To make the source more radioactive|To make every decay happen at the same time|To remove the source's neutrons
28||Unwanted radioactive material on or inside an object|Exposure to a distant source with no material transferred|Any exposure to visible light|An increase in an object's temperature only
29||Exposure to radiation without necessarily receiving radioactive material|Radioactive material deliberately stuck to an object|A process that always makes an object radioactive|The creation of extra protons by light
30||Reduce time, increase distance and use suitable shielding|Increase time near the source and remove shielding|Hold the source closer to reduce exposure|Touch sources directly to test whether they are safe
31||So other scientists can scrutinise methods, evidence and conclusions|To guarantee that no radiation risk can exist|To keep the research methods secret|To replace measurements with popularity
`);
  separate('p4', ['02', '05', '06', '09', '10'], `
32|Which is a natural source of background radiation?|Radon from rocks|Only medical X-ray machines|Only nuclear weapons testing|Only nuclear accidents
33||Sieverts (Sv)|Becquerels (Bq)|Amperes (A)|Ohms (Ω)
34||Long enough to detect, but not active unnecessarily afterwards|As long as possible regardless of dose|So short that no signal can ever be detected|Chosen only to make the isotope emit alpha inside every organ
36||A large nucleus splits into smaller nuclei, releasing energy and neutrons|Two small nuclei join to form a heavier nucleus|Electrons leave a metal by friction|An atom melts without a nuclear change
38||Light nuclei join to form a heavier nucleus, releasing energy|A large nucleus splits into smaller nuclei|All electrons become neutrons without energy change|A liquid changes into gas
`);

  const decks = window.FLASHCARD_DATA.subjects.flatMap(subject => subject.decks);
  for (const route of ['combined', 'triple']) {
    for (const [topicId, standard] of Object.entries(sets)) {
      const deck = decks.find(candidate => candidate.id === route + '-' + topicId);
      if (!deck || deck.cards.length !== 60) throw new Error('Missing expanded science deck: ' + route + '-' + topicId);
      const override = route === 'triple' && triples[topicId];
      const selected = override
        ? standard.filter(row => !override.omitted.includes(row.suffix)).concat(override.additions)
        : standard;
      if (selected.length !== 30 || new Set(selected.map(row => row.suffix)).size !== 30) {
        throw new Error('Expected 30 authored questions in ' + deck.id);
      }
      const prepared = selected.map(row => {
        const card = deck.cards.find(candidate => candidate.id === deck.id + '-' + row.suffix);
        if (!card || card.tier === 'H') throw new Error('Missing or Higher-only recall card: ' + deck.id + '-' + row.suffix);
        return {card, quiz: {question: row.question || card.question, options: row.options}};
      });
      // Replace paragraph-matching auto-quizzes, rather than silently adding more
      // than the requested 30 questions or changing a learner's flashcard IDs.
      for (const card of deck.cards) delete card.quiz;
      for (const {card, quiz} of prepared) card.quiz = quiz;
    }
  }
})();
