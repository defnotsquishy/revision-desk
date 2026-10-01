// Additional original application questions. Existing cards and IDs are retained.
(() => {
  'use strict';
  const subjects=window.FLASHCARD_DATA.subjects;
  const decks=subjects.flatMap(s=>s.decks);
  function science(topic,rows) {
    const additions=rows.trim().split('\n').map(line=>line.split('|'));
    for(const route of ['combined','triple']) {
      const deck=decks.find(d=>d.id===route+'-'+topic);
      const needed=60-deck.cards.length;
      if(additions.length<needed) throw new Error('Insufficient expansion: '+deck.id);
      additions.slice(0,needed).forEach(([question,answer,focus='Application',scope=''],i)=>{
        deck.cards.push({id:deck.id+'-extension-'+String(i+1).padStart(2,'0'),question,answer,
          tags:[focus,...(scope==='H'?['Higher only']:[])],tier:scope==='H'?'H':'both',sourceIds:deck.sources,
          exam:focus==='Calculation'?'Write the equation, substitute values and give the correct unit.':'Explain the link between the scientific idea and the observation in the question.'});
      });
    }
  }
  science('b1',`
A micrograph shows a 30 mm cell at ×600. What is its actual size?|30 ÷ 600 = 0.05 mm, or 50 µm.|Calculation
A cell is 8 µm wide at ×500. How wide is its image in mm?|8 × 500 = 4000 µm = 4 mm.|Calculation
A potato gains 0.4 g from an initial 2 g. Find its percentage mass change.|0.4 ÷ 2 × 100 = +20%.|Calculation
A 5 g potato ends at 4.5 g. Find its percentage mass change.|(4.5 − 5) ÷ 5 × 100 = −10%. Water has left the tissue overall.|Calculation
Why is staining useful when observing transparent cells?|It increases contrast so structures can be distinguished more clearly; staining does not itself increase resolving power.|Microscopy
Why should microscopy measurements use several cells?|Cells vary in size. A representative sample and mean reduce dependence on one unusual cell.|Microscopy
What is the difference between magnification and enlarging a digital image?|Enlargement makes the image bigger but adds no new detail; resolution determines whether adjacent structures can be distinguished.|Microscopy
Why does a coverslip need to be lowered gently?|It helps avoid trapped air bubbles that could obscure or be mistaken for cell structures.|Required practical
Why does a red blood cell not perform mitosis?|A mature human red blood cell has no nucleus or chromosomes to divide.|Cell division
Why must DNA be copied before a body cell divides?|Each daughter cell needs a complete set of genetic information rather than half of the original set.|Cell division
What would an uncontrolled increase in cell division risk causing?|A mass of abnormal cells, which can form a tumour. Tumours are not all malignant.|Cell division
Why are leaf and root cells structurally different?|Differentiation produces structures appropriate to different functions, such as chloroplasts for photosynthesis in many leaf cells.|Specialisation
How does a flattened red blood cell shape help transport?|Its biconcave shape gives a large surface area and short diffusion distance for oxygen.|Specialisation
Why are xylem cells useful after losing their contents?|Hollow tubes allow water flow with less obstruction; strengthened walls support the plant.|Specialisation
How would warmer conditions initially affect diffusion rate?|Particles move faster, increasing net diffusion for the same concentration gradient.|Transport
Why does maintaining blood flow help an exchange surface?|It removes absorbed substances and supplies others, maintaining concentration gradients.|Transport
Why can oxygen enter cells while carbon dioxide leaves?|Each substance diffuses down its own concentration gradient; the directions need not be identical.|Transport
What happens at diffusion equilibrium?|Particles still move randomly, but there is no net movement in one direction.|Transport
Why does active transport fail if cells cannot respire sufficiently?|Transport against a gradient needs energy, so a shortage of energy restricts the process.|Transport
Why can mineral ions enter roots even when soil concentration is lower?|Active transport moves ions against their concentration gradient using energy.|Application
Why does an animal cell swell in a sufficiently dilute solution?|Water enters by osmosis through its partially permeable membrane; it lacks a supporting cell wall.|Osmosis
Why does a plant cell become turgid rather than normally burst?|Water enters by osmosis, but its wall resists expansion and develops supporting pressure.|Osmosis
Why do plant cells become flaccid when they lose water?|Reduced vacuole volume and pressure against the wall decrease support.|Osmosis
Why plot percentage mass change rather than just grams gained?|It accounts for differing starting masses, making samples more comparable.|Required practical
What does a negative osmosis percentage show?|The sample lost mass overall, usually because water moved out into a more concentrated solution.|Data interpretation
How do you estimate an isotonic concentration from a graph?|Read the solution concentration where the best-fit line crosses zero percentage mass change.|Data interpretation
Why should potato pieces have equal dimensions as well as similar masses?|Dimensions affect surface area and diffusion distance, which can affect the rate of water exchange.|Required practical
Why are meristems found at root and shoot tips?|Their dividing cells supply new cells for plant growth in these regions.|Stem cells
Why can a patient reject transplanted cells?|The immune system may recognise cells as foreign if their antigens differ.|Stem cells
Why does a smaller cube exchange substances more effectively per unit volume?|Its surface-area-to-volume ratio is larger, leaving more exchange surface relative to the tissue supplied.|Transport
`);
  science('b2',`
Why is the small intestine suited to absorbing digestion products?|Villi provide a large surface area, thin walls shorten diffusion distances and blood flow maintains gradients.|Digestion
Where is starch-digesting amylase produced?|Salivary glands, pancreas and small intestine produce amylase.|Digestion
Why must food proteins be digested before absorption?|Large molecules cannot be absorbed efficiently; proteases produce smaller amino acids.|Digestion
Why does emulsification speed lipid digestion?|Smaller droplets expose more surface area for lipase to act on; bile is not an enzyme.|Digestion
Why is neutralising stomach acid useful in the small intestine?|It produces conditions more suitable for enzymes working there.|Digestion
What is an enzyme's active site?|The region where a suitably shaped substrate binds and the reaction occurs.|Enzymes
Why does a denatured enzyme not recover just by adding more substrate?|Its active-site shape has changed, so the substrate no longer fits properly.|Enzymes
Why can low temperature slow an enzyme without denaturing it?|Reduced particle motion decreases successful collisions while the enzyme's structure may remain intact.|Enzymes
Why add a pH buffer in an amylase investigation?|It maintains the chosen pH during each reaction, isolating the variable being tested.|Required practical
Why take amylase samples at regular intervals?|A consistent interval allows time to starch disappearance to be compared between conditions.|Required practical
How is enzyme rate estimated from completion time?|Use 1 ÷ time for a fixed amount of substrate; a shorter time means a faster rate.|Calculation
If starch disappears in 40 s, what is 1/time?|1 ÷ 40 = 0.025 s⁻¹. It is a comparative rate, not a mass of product per second.|Calculation
What does iodine remaining orange-brown show in an amylase test?|No starch is detected in that sample; it does not by itself identify the sugar produced.|Food tests
Why include a known positive sample when testing food?|It confirms that the reagent and procedure can detect the substance under those conditions.|Food tests
Why is the left ventricle wall thicker than the right?|It must generate greater pressure to drive blood around the whole body rather than only to the lungs.|Circulation
What stops blood flowing backwards inside the heart?|Valves close when pressure would push blood in the wrong direction.|Circulation
What supply do the coronary arteries provide?|Oxygenated blood and nutrients to the heart muscle for respiration.|Heart disease
Why can blocked coronary arteries damage heart muscle?|Less oxygen reaches cells, reducing aerobic respiration and potentially causing cell death.|Heart disease
Why does a stent not remove every cause of heart disease?|It opens a narrowed artery but does not automatically change risk factors or all other blockages.|Evaluation
What is the job of a natural pacemaker?|A group of cells in the right atrium controls the heart's regular contractions.|Circulation
Why can vein valves be important at low pressure?|They prevent backward flow, helping blood return towards the heart.|Circulation
What does plasma transport besides blood cells?|Dissolved substances including glucose, carbon dioxide and urea, as well as heat.|Blood
Why do platelets matter when skin is damaged?|They help blood clot, limiting blood loss and pathogen entry.|Blood
Why does inhaling maintain a gas-exchange gradient?|Fresh air raises alveolar oxygen concentration and removes carbon dioxide from the lungs.|Gas exchange
Why can smoking damage gas exchange?|Damage to alveolar walls reduces effective surface area; airway damage also affects ventilation and clearance.|Health
Why do communicable and non-communicable diseases interact?|For example, an infection can weaken a person or trigger conditions that increase other health risks.|Health
Why is a correlation between lifestyle and disease insufficient alone?|Other variables can contribute; researchers need evidence for a causal relationship.|Working scientifically
Why is a plant's epidermis useful if it is transparent?|Light passes through to photosynthetic cells beneath, while the surface protects the leaf.|Plant organisation
Why do leaves usually have a waxy cuticle?|It reduces uncontrolled evaporation of water from the surface.|Plant organisation
Why can high humidity lower transpiration?|It reduces the water-vapour concentration gradient between the leaf and surrounding air.|Plant transport
`);
  science('b3',`
Why is killing a virus harder without damaging host cells?|Viruses reproduce inside cells, using the host's machinery, so treatments must distinguish viral processes from normal ones.|Pathogens
Why is malaria not classified as a bacterial disease?|Its pathogen is a protist; the mosquito is a vector, not the pathogen itself.|Pathogens
Why does washing hands after handling raw food help?|It reduces transfer of pathogens to cooked food, mouths or surfaces.|Prevention
Why can isolation interrupt an infection chain?|It reduces contact between an infectious person and susceptible people.|Prevention
Why is clean drinking water important for disease prevention?|It limits ingestion of pathogens carried by contaminated water.|Prevention
Why can symptom-free infection still spread?|An infected person may carry and transmit a pathogen without obvious symptoms.|Transmission
Why does measles vaccination protect more than one individual?|Reducing susceptible hosts can reduce transmission, helping people who cannot be vaccinated.|Vaccination
Why are gonorrhoea treatments harder when strains are resistant?|The antibiotic no longer kills or inhibits those strains effectively, limiting treatment options.|Resistance
Why can Salmonella cause symptoms through toxins?|Bacteria can release harmful substances, so damage is not simply caused by their presence.|Bacteria
Why does damaged chlorophyll reduce a plant's growth?|Less light is absorbed for photosynthesis, reducing glucose production.|Plant disease
Why does rose black spot spread more readily in damp conditions?|Water can help fungal spores spread; environmental conditions affect infection as well as the pathogen.|Plant disease
What is the difference between mucus and cilia in defence?|Mucus traps particles and pathogens; cilia move the mucus towards the throat.|Defences
Why is a scab useful after a cut?|Clotting seals the wound and limits further pathogen entry while tissue repairs.|Defences
How are antibodies different from antitoxins?|Antibodies target particular antigens; antitoxins neutralise toxins released by some pathogens.|Immune response
Why does the first response to a new pathogen take time?|The appropriate immune cells must recognise antigens and multiply to produce enough specific antibodies.|Immune response
Why can a second response to the same antigen be faster?|Memory cells can respond quickly, producing antibodies sooner and in greater quantities.|Immune response
Why does one vaccine not protect against every disease?|Immune responses are specific to particular antigens, which differ between pathogens.|Vaccination
Why might a pathogen's changed antigens reduce existing immunity?|Existing memory responses may not recognise the altered antigens as effectively.|Vaccination
Why does taking an antibiotic create selection pressure?|Susceptible bacteria die while resistant variants are more likely to survive and reproduce.|Resistance
Why is resistance not a bacterium deciding to adapt?|Genetic variation arises without intention; antibiotic exposure selects surviving variants.|Resistance
Why should antibiotics not be prescribed for an ordinary viral infection?|They do not target viruses and unnecessary use selects antibiotic-resistant bacteria.|Medicines
Why is relief of fever not proof a pathogen is eliminated?|A medicine can treat symptoms while the infection persists.|Medicines
Why are drugs screened for toxicity before broad use?|A treatment must be assessed for harmful effects as well as possible benefit.|Drug testing
Why is a low dose used initially in healthy-volunteer trials?|It helps assess safety and side effects while limiting exposure; some drugs require different ethical trial designs.|Drug testing
What does efficacy mean in drug testing?|How well the drug produces its intended therapeutic effect.|Drug testing
Why does randomly allocating trial participants matter?|It reduces systematic differences between treatment groups that could otherwise explain outcomes.|Drug testing
Why compare treatment and control groups with similar care?|Differences other than the active drug could bias the measured effect.|Drug testing
Why can knowing a treatment influence reported improvement?|Expectations can change perceptions or reporting, creating placebo or observer effects.|Drug testing
Why should adverse effects be considered alongside benefits?|An effective drug may still cause harm; clinical decisions weigh both rather than efficacy alone.|Evaluation
Why can a small trial miss rare side effects?|Few participants may experience a rare event, so larger studies and continued monitoring add evidence.|Working scientifically
`);
  science('b4',`
Why must photosynthesis and respiration not be treated as the same process?|Photosynthesis stores energy in glucose using light; respiration transfers energy from substrates for cell activities.|Bioenergetics
Does a plant respire during the day?|Yes. Respiration occurs continuously in living cells, while photosynthesis requires suitable light.|Respiration
Why does a plant need nitrate ions to make proteins?|Nitrates supply nitrogen needed to combine with glucose-derived materials to form amino acids.|Plant metabolism
Why is insoluble starch useful for glucose storage?|It does not diffuse away easily and has less osmotic effect than storing many soluble glucose molecules.|Plant metabolism
Why does a thin leaf help photosynthesis?|Carbon dioxide has a short diffusion distance to photosynthesising cells.|Photosynthesis
Why can closing stomata reduce photosynthesis?|It limits carbon dioxide entry, although it also reduces water loss.|Photosynthesis
Why can more light fail to increase photosynthesis?|Another factor, such as carbon dioxide availability or temperature, may now be limiting.|Limiting factors
How does chlorophyll deficiency affect a plant in bright light?|The plant absorbs less light effectively, so raising light alone may not restore the expected rate.|Limiting factors
How can you identify temperature limiting a greenhouse crop?|If increasing temperature raises rate while light and carbon dioxide remain adequate, temperature was restricting the rate.|Data interpretation
Why can excessive greenhouse temperature reduce crop production?|Enzyme function can be impaired and water loss can increase; hotter is not always better.|Evaluation
Why is a lamp's distance a useful controlled variable?|Distance changes light intensity, so unintended changes could affect photosynthesis readings.|Required practical
Why might an LED lamp reduce an experimental confound?|It can produce less unwanted heating than some lamps, helping separate light effects from temperature effects.|Required practical
Why add a controlled source of carbon dioxide to pondweed water?|It reduces variation in carbon dioxide availability when investigating light intensity.|Required practical
A pondweed releases 12 cm³ oxygen in 4 min. What is its rate?|12 ÷ 4 = 3 cm³/min.|Calculation
Rates are 2.8, 3.0 and 3.2 cm³/min. What is their mean?|9.0 ÷ 3 = 3.0 cm³/min.|Calculation
Why allow pondweed to settle after changing conditions?|Its response needs time to stabilise before a comparable measurement is recorded.|Required practical
Why should a photosynthesis best-fit graph not join every point blindly?|Measurements contain variation; a suitable curve can show the overall relationship more clearly.|Data interpretation
What happens to intensity if a lamp distance doubles?|For an approximate point source, intensity becomes one-quarter because it follows 1/distance².|Calculation|H
What happens to intensity if distance is halved?|For an approximate point source, intensity becomes four times greater.|Calculation|H
Why does aerobic respiration transfer more energy per glucose than anaerobic respiration?|Glucose is broken down more completely during aerobic respiration.|Respiration
Why are water and carbon dioxide not the human anaerobic products?|Human anaerobic respiration produces lactic acid from glucose without using oxygen.|Respiration
Why can yeast inflate bread dough?|Anaerobic respiration produces carbon dioxide, forming gas bubbles in the dough.|Respiration
Which yeast respiration product is used in alcoholic drinks?|Ethanol, made during anaerobic respiration of sugars.|Respiration
Why is respiration described as exothermic?|It transfers energy to the surroundings and cellular processes rather than requiring an overall energy input.|Respiration
Which muscular activity uses energy from respiration?|Contraction, which moves the body and requires continuous energy transfer.|Respiration
Why can breathing stay elevated after strenuous exercise?|Extra oxygen is needed while the body recovers, including dealing with accumulated lactic acid.|Exercise
How does an increased pulse assist active muscles?|More blood delivers oxygen and glucose and carries carbon dioxide away more rapidly.|Exercise
Why can muscle fatigue reduce performance?|Sustained activity and insufficient oxygen can lead to lactic acid accumulation and less effective contraction.|Exercise
Why is making glycogen a metabolic reaction?|It builds a larger storage molecule from glucose units as part of cellular chemical processes.|Metabolism
Why is urea excreted rather than stored as a useful protein?|It is a waste product from processing excess amino acids and can be harmful if it accumulates.|Metabolism
`);
  science('c1',`
How many elements are present in carbon dioxide?|Two: carbon and oxygen. Three atoms in its formula does not mean three elements.|Chemical formulae
Why is air a mixture rather than a compound?|Its gases are not chemically bonded together in a fixed ratio.|Mixtures
Why can dissolved salt pass through ordinary filter paper?|Dissolved ions are too small to be separated by the paper's pores; filtration removes insoluble solids.|Separation
How can a pure solvent be recovered from salt water?|Evaporate the water and condense its vapour using distillation, leaving the salt behind.|Separation
Why is a condenser needed during distillation?|Cooling changes vapour back into liquid so the solvent can be collected.|Separation
Why must chromatography solvent start below the spots?|Otherwise the samples dissolve directly into the reservoir instead of travelling up the paper.|Chromatography
Why can one dye travel farther than another?|It differs in attraction to the paper and solubility in the solvent.|Chromatography
What would multiple spots from one ink suggest?|The ink contains several soluble components under those chromatographic conditions.|Chromatography
Why can a single chromatography spot still be inconclusive?|Different substances can travel together, or the solvent may not separate all components.|Evaluation
Why are subscripts not changed when balancing equations?|A subscript changes a substance's chemical formula; coefficients change quantities without changing identity.|Equations
How many neutrons are in aluminium-27 with atomic number 13?|27 − 13 = 14 neutrons.|Calculation
How many electrons are in Mg²⁺ if magnesium has atomic number 12?|10 electrons: the neutral atom has lost two.|Calculation
How many electrons are in Cl⁻ if chlorine has atomic number 17?|18 electrons: the atom has gained one.|Calculation
Why do isotopes of the same element react similarly?|They have the same electron arrangement, which controls chemical reactions.|Isotopes
An element is 50% isotope-10 and 50% isotope-11. What is its Ar?|0.5 × 10 + 0.5 × 11 = 10.5.|Calculation
What is the electron arrangement of chlorine, atomic number 17?|2,8,7, giving seven electrons in its outer shell.|Atomic structure
What is the electron arrangement of calcium, atomic number 20?|2,8,8,2 for the GCSE model of the first twenty elements.|Atomic structure
What does an element's period tell you in the GCSE shell model?|The number of occupied electron shells.|Periodic table
Why did ordering only by atomic mass create difficulties?|Some elements had to be placed out of mass order to group elements with similar chemical properties.|Periodic table
How did later discoveries support Mendeleev?|New elements matched many properties he predicted for gaps in his table.|Scientific models
Why did a few strongly deflected alpha particles matter?|They implied a concentrated positive charge in a small nucleus, contradicting diffuse positive charge.|Scientific models
What does a Group 1 metal form when reacting with water?|A metal hydroxide and hydrogen; the solution is alkaline.|Group 1
Why is potassium usually more reactive than sodium?|Its outer electron is farther from the nucleus and more shielded, so it is lost more easily.|Group 1
What colour changes distinguish halogens at room temperature?|Chlorine is a pale green gas, bromine a red-brown liquid and iodine a grey-black solid with purple vapour.|Group 7
Why does halogen boiling point increase down the group?|Larger molecules have stronger intermolecular attractions, needing more energy to separate.|Group 7
Will chlorine displace bromine from potassium bromide?|Yes. Chlorine is more reactive and forms chloride while bromine is released.|Group 7
Will iodine displace chlorine from sodium chloride?|No. Iodine is less reactive than chlorine.|Group 7
Why does argon not readily form bonds?|Its outer electron shell is full, giving a stable electron arrangement.|Group 0
What do all atoms of oxygen necessarily share?|Eight protons. Their neutron counts can differ between isotopes.|Atomic structure
Why is an atom mostly empty space?|The nucleus occupies a tiny fraction of the atom's volume, with electrons around it.|Atomic structure
`);
  science('c2',`
What charge must the total ions in an ionic compound have?|Zero overall: positive and negative charges balance in the formula unit.|Ionic bonding
Why is the formula of magnesium chloride MgCl₂?|One Mg²⁺ needs two Cl⁻ ions to balance its +2 charge.|Ionic formulae
Why is calcium oxide written CaO rather than Ca₂O₂?|Ca²⁺ and O²⁻ balance in the simplest whole-number ratio of 1:1.|Ionic formulae
Why do ionic bonds act in every direction in a lattice?|Each charged ion attracts oppositely charged ions surrounding it, not just one partner.|Ionic bonding
Why can sodium chloride solution conduct electricity?|Dissolved ions are mobile and carry charge through the solution.|Conductivity
Why do electrons not need to travel through the liquid for ionic conduction?|Mobile ions carry the charge in the electrolyte; electrons travel through the external metal wires.|Conductivity
How many bonds does carbon form in methane?|Four single covalent bonds, sharing one electron pair with each hydrogen.|Covalent bonding
What is the bonding in a water molecule?|Oxygen shares one pair with each of two hydrogens, making two single covalent bonds.|Covalent bonding
What is a double covalent bond?|Two shared electron pairs between the same atoms.|Covalent bonding
Why does boiling water not split water molecules into hydrogen and oxygen?|Boiling overcomes intermolecular attractions, not the strong covalent bonds within water molecules.|Molecular substances
Why are covalent bonds not necessarily weak despite low molecular boiling points?|The weak attractions overcome during boiling are between molecules; bonds within them remain strong.|Molecular substances
Why do polymers usually have higher melting temperatures than small similar molecules?|Long molecules have many points of intermolecular attraction, requiring more energy to separate.|Polymers
What distinguishes a molecule from a giant covalent network?|A molecule is a finite group of bonded atoms; a network has bonds continuing through a very large structure.|Structures
How many covalent bonds does each carbon have in diamond?|Four, forming a three-dimensional giant network.|Carbon structures
How many covalent bonds does each carbon have in graphite?|Three, within layers, leaving an electron available for delocalisation.|Carbon structures
Why can graphite slide while diamond cannot?|Graphite has weak attractions between layers; diamond's covalent bonds extend through its rigid network.|Comparison
Why can graphene conduct along its sheet?|Delocalised electrons can move through the carbon structure and transfer charge.|Carbon structures
How is a nanotube related to graphene?|It is a cylindrical carbon structure that can be represented as a rolled sheet of graphene.|Carbon structures
Why could fullerenes carry other substances?|Their hollow molecular structures can enclose or carry particles; suitability depends on size and interactions.|Carbon structures
What charges attract in metallic bonding?|Positive metal ions and the surrounding delocalised electrons.|Metallic bonding
Why does metallic bonding survive when layers slide?|The electrostatic attraction to mobile delocalised electrons continues as the ions change positions.|Metallic bonding
Why is a copper wire useful in a circuit?|Its delocalised electrons can move and transfer charge through the solid metal.|Materials
Why does adding different-sized atoms make an alloy resist bending?|The disrupted regular arrangement makes layers harder to slide.|Alloys
Why do substances expand when heated in a simple particle explanation?|Particles move more energetically and their average separation can increase; the particles themselves do not become larger.|Particle model
What changes when a solid melts?|Particles gain enough energy to move past one another while remaining close together.|States
Why is gas easy to compress compared with a liquid?|There are large spaces between its particles, so its volume can decrease greatly.|States
Why does liquid spread to fill the bottom of a container?|Particles can move past each other, so the liquid changes shape while retaining a nearly fixed volume.|States
What does the state symbol (l) specify?|The substance is liquid, not necessarily dissolved in water.|State symbols
What does the state symbol (s) specify?|The substance is solid under the stated reaction conditions.|State symbols
How do you infer an ionic structure from melting and conductivity data?|High melting point, no conduction as a solid, and conduction when molten support a giant ionic lattice.|Data interpretation
`);
  science('c3',`
What is the Mr of CO₂ using C = 12 and O = 16?|12 + 2 × 16 = 44. Relative formula mass has no unit.|Calculation
What is the Mr of NaCl using Na = 23 and Cl = 35.5?|23 + 35.5 = 58.5.|Calculation
What is the Mr of H₂SO₄ using H = 1, S = 32 and O = 16?|2 + 32 + 64 = 98.|Calculation
What is the Mr of Ca(OH)₂ using Ca = 40, O = 16 and H = 1?|40 + 2 × (16 + 1) = 74.|Calculation
What percentage of water's mass is hydrogen if Mr = 18?|2 ÷ 18 × 100 ≈ 11.1%.|Calculation
What percentage of CO₂'s mass is carbon if Mr = 44?|12 ÷ 44 × 100 ≈ 27.3%.|Calculation
A closed reaction starts with 12 g and 8 g reactants. What total product mass is expected?|20 g if all products remain in the closed system; atoms and total mass are conserved.|Calculation
Why should a conservation-of-mass test use a closed system?|Escaping gas or incoming oxygen can change the measured mass even though total mass is conserved.|Required practical
Mass readings are 4.8, 5.0 and 5.2 g. What is the mean?|15.0 ÷ 3 = 5.0 g.|Calculation
What is half the range of readings 4.8 to 5.2 g?|The range is 0.4 g, so estimated uncertainty by this method is ±0.2 g.|Calculation
Why might a mean be misleading if an anomalous result is included?|An unusual reading can pull the mean away from the typical measurements; investigate rather than deleting inconvenient data automatically.|Data interpretation
Why do balanced equations conserve each element separately?|Chemical reactions rearrange atoms rather than turning one element into another.|Equations
Balance Na + Cl₂ → NaCl.|2Na + Cl₂ → 2NaCl, giving two atoms of each element on each side.|Equations
Balance CaCO₃ → CaO + CO₂.|It is already balanced: one Ca, one C and three O atoms occur on each side.|Equations
Balance Al + O₂ → Al₂O₃.|4Al + 3O₂ → 2Al₂O₃.|Equations
How much is 250 cm³ in dm³?|0.250 dm³: divide cubic centimetres by 1000.|Calculation
How much is 0.08 dm³ in cm³?|80 cm³: multiply cubic decimetres by 1000.|Calculation
Find concentration when 3 g is dissolved to make 150 cm³ solution.|Volume = 0.150 dm³; 3 ÷ 0.150 = 20 g/dm³.|Calculation
Find the mass in 200 cm³ of 15 g/dm³ solution.|15 × 0.200 = 3 g.|Calculation
What volume contains 6 g at 12 g/dm³?|6 ÷ 12 = 0.5 dm³, or 500 cm³.|Calculation
If solution volume doubles without changing dissolved mass, what happens to concentration?|It halves, provided no solute is added or removed.|Concentration
Why is solution volume not always equal to the water initially added?|The concentration calculation needs the final volume of the solution, after dissolving the solute.|Concentration
How many moles are in 11 g CO₂ with Mr = 44?|11 ÷ 44 = 0.25 mol.|Calculation|H
What mass is 0.2 mol NaCl with Mr = 58.5?|0.2 × 58.5 = 11.7 g.|Calculation|H
How many particles are in 0.5 mol using Avogadro's constant 6.02 × 10²³?|0.5 × 6.02 × 10²³ = 3.01 × 10²³ particles.|Calculation|H
In 2H₂ + O₂ → 2H₂O, how much oxygen reacts with 4 mol hydrogen?|2 mol oxygen, using the 2:1 reactant ratio.|Calculation|H
How many moles of water form from 3 mol hydrogen with excess oxygen?|3 mol water because the hydrogen-to-water ratio is 2:2.|Calculation|H
In 2Mg + O₂ → 2MgO, which is limiting with 1 mol Mg and 1 mol O₂?|Magnesium is limiting: 1 mol Mg only requires 0.5 mol O₂.|Calculation|H
Why do equal masses of different substances not normally contain equal numbers of moles?|Their relative formula masses differ, and moles equal mass divided by Mr.|Moles|H
Why use the limiting reactant to calculate maximum product mass?|It is exhausted first, so surplus reactant cannot make extra product without more of the limiting substance.|Reacting amounts|H
`);
  science('c4',`
What is the product salt of magnesium and hydrochloric acid?|Magnesium chloride; hydrogen is the other product.|Acids and salts
What salt forms from copper oxide and sulfuric acid?|Copper sulfate, with water also produced.|Acids and salts
What salt forms when calcium carbonate reacts with nitric acid?|Calcium nitrate; carbon dioxide and water are also produced.|Acids and salts
How do you test gas from an acid-carbonate reaction?|Carbon dioxide turns limewater milky or cloudy.|Gas tests
How do you identify hydrogen in a school gas test?|A lighted splint produces a squeaky pop, under supervised safe conditions.|Gas tests
Why does copper not react with dilute hydrochloric acid in the usual GCSE experiment?|It is below hydrogen in the reactivity series and does not displace it from dilute acid.|Reactivity
Why can zinc displace copper from copper sulfate solution?|Zinc is more reactive and loses electrons more readily, leaving copper metal.|Reactivity
Would copper displace magnesium from magnesium sulfate?|No. Copper is less reactive than magnesium.|Reactivity
What happens to magnesium when it burns in oxygen?|It is oxidised to magnesium oxide.|Oxidation
Why is reducing a metal oxide not the same as melting it?|Reduction removes oxygen or involves electron gain; melting is a physical state change.|Extraction
Why can aluminium's extraction use much electricity?|Electrolysis requires energy to break down the compound and maintain suitable operating conditions.|Extraction
Why is recycling aluminium often less energy-demanding than extracting it?|Remelting recovered metal avoids much of the electrolysis needed to produce metal from ore.|Evaluation
What is the difference between a base and an alkali?|A base neutralises acids; an alkali is a base soluble in water.|Acids and bases
What does neutral pH mean in the GCSE aqueous context?|pH 7 indicates neutral solution under the usual school conditions, not the absence of dissolved substances.|pH
Why is indicator colour not a precise concentration measurement?|It gives a pH range or estimate, and concentration is not identical to acid strength.|Measurement
Why is copper oxide filtered off before crystallising copper sulfate?|Excess insoluble solid is removed, leaving the salt solution for crystallisation.|Required practical
Why add an insoluble base until some remains unreacted?|Excess shows the acid has been used up, avoiding acid contamination of the crystals.|Required practical
Why cool a concentrated salt solution slowly?|As solubility falls, crystals form from the solution; the method preserves the salt rather than decomposing it by overheating.|Required practical
Why do solid ionic compounds not undergo ordinary electrolysis?|Their ions cannot move freely to the electrodes until melted or dissolved.|Electrolysis
Which electrode attracts positive ions?|The negative cathode attracts cations, where they gain electrons.|Electrolysis
Which electrode attracts negative ions?|The positive anode attracts anions, where they lose electrons.|Electrolysis
What forms at the cathode in molten sodium chloride?|Sodium metal because sodium ions gain electrons; water is absent.|Electrolysis
What forms at the anode in molten sodium chloride?|Chlorine because chloride ions lose electrons.|Electrolysis
Why can molten and aqueous sodium chloride produce different cathode products?|Water supplies hydrogen ions in the aqueous case; molten salt contains only the salt's ions.|Comparison
Why are inert electrodes useful in comparing electrolytes?|They conduct without intentionally adding electrode reactions, making products easier to attribute to the electrolyte.|Required practical
What gas relights a glowing splint?|Oxygen, a possible anode product during electrolysis of suitable aqueous solutions.|Gas tests
Why must electrolysis gas tests follow school safety controls?|Products such as chlorine can be hazardous, and electrical equipment and corrosive solutions need supervision.|Safety
Write the half-equation for sodium ion reduction.|Na⁺ + e⁻ → Na. One electron balances the +1 charge.|Half-equations|H
Why is losing electrons called oxidation even without oxygen?|Electron transfer is the broader definition; oxygen gain is a useful but narrower version.|Redox|H
If hydrogen-ion concentration becomes ten times smaller, how does pH change?|pH rises by one, for the GCSE comparison of aqueous solutions.|pH|H
`);
  science('c5',`
Why does an exothermic reaction warm nearby surroundings?|Energy transferred out of the reacting system increases the surroundings' thermal energy.|Energy transfer
Why does an endothermic reaction cool a reaction mixture?|Energy is taken from the surroundings into the reacting system, decreasing their thermal energy.|Energy transfer
Why can burning fuel need ignition although it releases energy overall?|An initial activation-energy barrier must be overcome before the reaction proceeds.|Activation energy
What is a reaction profile's highest point associated with?|The energy barrier between reactants and products, not simply the final product energy.|Reaction profiles
Why does a catalyst not change the overall reaction energy?|It changes the reaction pathway and activation energy, not the initial and final energy levels.|Catalysts
How would a catalysed profile differ from an uncatalysed one?|It has a lower peak but the same reactant and product levels.|Reaction profiles
Why must reaction-profile arrows start at the correct level?|Activation energy is measured from reactants to peak; overall change is measured between reactants and products.|Data interpretation
Why is room temperature useful to record in a calorimetry comparison?|It helps interpret unwanted heating or cooling between the cup and surroundings.|Required practical
Why can a metal container distort a temperature-change experiment?|It absorbs energy and can conduct energy away, reducing the solution's measured temperature change.|Required practical
Why is a thermometer's resolution relevant?|Small temperature changes may not be distinguishable precisely with coarse scale divisions.|Measurement
Why keep solution volume fixed when comparing reactions?|A different mass of solution can show a different temperature change for the same transferred energy.|Required practical
Why rinse equipment between temperature-change trials?|Residual chemicals could alter concentrations or start extra reactions.|Required practical
Why wait for a stable starting temperature before mixing?|It provides a reliable baseline from which the change can be calculated.|Required practical
Why can a delayed first reading miss an exothermic peak?|Energy may already have been lost to surroundings before measurement.|Measurement
A solution starts at 18.5°C and peaks at 25°C. Find the rise.|25 − 18.5 = 6.5°C.|Calculation
A solution starts at 23°C and reaches 19.5°C. Find the change.|19.5 − 23 = −3.5°C, a fall of 3.5°C.|Calculation
Changes of 5.0, 5.4 and 5.2°C are recorded. What is the mean?|15.6 ÷ 3 = 5.2°C.|Calculation
Why does a large temperature rise not prove more energy per mole was released?|Reactant amounts and solution mass also affect temperature change; compare equivalent conditions.|Evaluation
Why can different reactant concentrations spoil a fair comparison?|They change the number of particles reacting and possibly the amount of energy transferred.|Required practical
What evidence supports classifying a cold-pack reaction as endothermic?|Under controlled conditions, the surroundings cool as the reaction takes in energy.|Application
Why does cooling caused by evaporation not prove a chemical reaction is endothermic?|Evaporation is a physical process that can also absorb energy; identify the process responsible.|Evaluation
Why should reactions and surroundings be distinguished in energy answers?|Energy gained by one is lost by the other; mixing them up reverses the explanation.|Energy transfer
Why does energy conservation allow an exothermic reaction?|Energy decreases in the reacting system while increasing elsewhere; it is transferred, not created.|Energy transfer
Why are thermal-decomposition reactions often heated continuously?|Energy input is required to break down the compound and sustain the endothermic process.|Application
Why can a reusable crystallisation hand warmer differ from burning fuel?|Crystallisation releases energy through a physical change; combustion is a chemical reaction.|Application
What does it mean to describe a reaction's energy change per mole?|The energy is related to a specified amount reacting, so comparisons must use the stated equation.|Energy changes
Why must all bonds in the balanced reactants be counted in a bond-energy calculation?|Omitting molecules or bond multiplicities underestimates the energy needed for bond breaking.|Bond energies|H
Breaking needs 1200 kJ/mol and forming releases 1500 kJ/mol. Find the change.|1200 − 1500 = −300 kJ/mol, so the reaction is exothermic.|Calculation|H
Breaking needs 900 kJ/mol and forming releases 650 kJ/mol. Find the change.|900 − 650 = +250 kJ/mol, so the reaction is endothermic.|Calculation|H
Why are mean bond-energy predictions approximate?|Bond energies depend on molecular surroundings; tabulated values average across compounds.|Evaluation|H
`);
  science('p1',`
What energy-store changes occur when a cyclist climbs uphill?|The chemical store decreases while the gravitational potential store increases; some energy is dissipated to thermal stores.|Application
Why does a stationary object high above ground still have energy?|Its gravitational potential store depends on height relative to a chosen reference level, not speed.|Energy stores
Why is describing energy as used up scientifically misleading?|Energy is conserved but spreads into less useful stores and becomes harder to transfer usefully.|Conservation
What is the kinetic energy of 4 kg moving at 5 m/s?|½ × 4 × 5² = 50 J.|Calculation
If mass doubles at fixed speed, how does kinetic energy change?|It doubles because kinetic energy is directly proportional to mass.|Calculation
If speed triples at fixed mass, how does kinetic energy change?|It becomes nine times larger because kinetic energy depends on speed squared.|Calculation
How much gravitational energy is gained by 3 kg lifted 2 m with g = 10 N/kg?|3 × 10 × 2 = 60 J.|Calculation
What height gives 100 J gravitational energy to 2 kg with g = 10 N/kg?|100 ÷ (2 × 10) = 5 m.|Calculation
What is stored by a 200 N/m spring extended 0.2 m?|½ × 200 × 0.2² = 4 J, within its elastic limit.|Calculation
Why must extension be converted from centimetres in spring-energy calculations?|Using metres makes the result consistent with spring constant in N/m and energy in joules.|Units
How does doubling spring extension affect energy within the elastic limit?|Energy increases by a factor of four because it depends on extension squared.|Calculation
A 2 kg block with c = 400 J/kg°C warms 5°C. Find its energy change.|2 × 400 × 5 = 4000 J.|Calculation
A 1 kg block gains 900 J and warms 3°C. Find c.|900 ÷ (1 × 3) = 300 J/kg°C.|Calculation
Why does heat loss affect a measured specific heat capacity?|Not all input energy heats the block, so using the full input can overestimate c.|Required practical
Why insert a thermometer in good thermal contact with the block?|It helps the reading reflect the block's temperature rather than unrelated surrounding air.|Required practical
Why record an electrical heater's power and running time?|Energy input can be estimated from power × time.|Required practical
What power transfers 2400 J in 20 s?|2400 ÷ 20 = 120 W.|Calculation
How long does a 50 W device take to transfer 1000 J?|1000 ÷ 50 = 20 s.|Calculation
Why does a more powerful device not necessarily use less energy?|Power is transfer rate; total energy also depends on how long it operates.|Power
What useful output comes from 500 J input at 60% efficiency?|0.60 × 500 = 300 J, with 200 J transferred elsewhere.|Calculation
What percentage efficiency gives 150 W useful output from 200 W input?|150 ÷ 200 × 100 = 75%.|Calculation
Why can no real device have efficiency above 100%?|Useful output cannot exceed total input without violating energy conservation.|Efficiency
Why does a thicker insulating layer usually reduce heat loss?|It makes energy transfer through the material more difficult, depending on its thermal conductivity.|Insulation
How does thermal conductivity affect cooling through a wall?|Higher conductivity generally allows faster energy transfer for comparable thickness and conditions.|Insulation
Why is comparing fuels only by purchase price incomplete?|Pollution, reliability, infrastructure and extraction or disposal impacts also matter.|Resources
Why do tidal electricity supplies differ from wind in predictability?|Tides follow predictable cycles, although output still varies through those cycles.|Resources
Why can hydroelectric generation affect ecosystems?|Reservoirs flood land and dams change river flow and habitats.|Resources
What energy source supplies geothermal heating?|Thermal energy from within Earth, accessible more readily in some locations than others.|Resources
Why might storage help renewable electricity systems?|It can shift some surplus energy to times when demand exceeds immediate generation.|Resources
Why is demand considered alongside generating capacity?|A power system must meet changing needs at the required time, not just produce enough energy in total.|Evaluation
`);
  science('p2',`
How much charge passes in 2 min with a current of 0.5 A?|Q = It = 0.5 × 120 = 60 C.|Calculation
What current carries 90 C in 30 s?|90 ÷ 30 = 3 A.|Calculation
What potential difference drives 0.5 A through 12 Ω?|V = IR = 0.5 × 12 = 6 V.|Calculation
What current flows through 8 Ω at 24 V?|I = V/R = 24 ÷ 8 = 3 A.|Calculation
What does a straight I–V graph through the origin indicate at constant temperature?|Current is proportional to potential difference, consistent with constant resistance.|I–V characteristics
Why must an ohmic conductor's temperature be controlled?|Heating can change its resistance and spoil the proportional I–V relationship.|Required practical
Why is current almost zero for a diode in reverse direction?|A diode greatly resists current in reverse bias in the usual GCSE operating range.|Components
Why might a thermistor be useful in a temperature sensor?|Its resistance varies with temperature, allowing an electrical circuit to respond.|Components
Why might an LDR control an automatic lamp?|Its resistance changes with light level, allowing a circuit to detect darkness.|Components
Why does opening one switch stop a simple series circuit?|It breaks the single path available for charge flow.|Series circuits
What is the total series resistance of 4 Ω and 6 Ω?|4 + 6 = 10 Ω.|Calculation
Two series components have 2 V and 4 V across them. Find supply p.d.|2 + 4 = 6 V.|Calculation
Why can other parallel lamps stay lit if one branch breaks?|The remaining branches still provide complete paths across the supply.|Parallel circuits
A junction has 5 A entering and one branch carries 2 A. What leaves through the other?|3 A, because total current entering equals total current leaving.|Calculation
Why do identical parallel resistors share current equally?|They have equal resistance and the same potential difference across them.|Parallel circuits
Why is electrical charge not consumed by a lamp?|Charge continues around the circuit; energy is transferred by the component.|Charge and energy
How much energy is transferred by 20 C across 6 V?|E = QV = 20 × 6 = 120 J.|Calculation
How much power does a 230 V appliance draw at 2 A?|P = VI = 230 × 2 = 460 W.|Calculation
How much power is dissipated by 3 A through 4 Ω?|P = I²R = 3² × 4 = 36 W.|Calculation
How much energy does a 2 kW heater transfer in 30 min?|2000 × 1800 = 3,600,000 J, or 1 kWh.|Calculation
Why must hours be converted to seconds for E = Pt in joules?|Watts are joules per second, so time must be in seconds.|Units
Why is the earth wire normally current-free?|It is a safety path that carries current if a fault makes a metal case live, not the normal operating return.|Electrical safety
Why does a double-insulated appliance not require an earth connection?|Its insulating construction prevents accessible parts becoming live in the usual safety design.|Electrical safety
Why should a mains plug's cable grip hold the outer sheath?|It reduces strain on internal connections rather than allowing pulling forces to act on individual wires.|Electrical safety
Why should a fuse rating be above normal operating current but not unnecessarily high?|It must allow normal operation while melting at a sufficiently excessive current; selection follows appliance guidance.|Electrical safety
Why must a switch interrupt the live supply rather than only neutral?|Disconnecting live reduces the risk of internal parts remaining at dangerous potential.|Electrical safety
Why does lowering transmission current reduce heating losses?|Cable power loss is I²R, so reducing current greatly reduces dissipation.|National Grid
Why does a longer same-material wire have more resistance?|Moving charge interacts over a longer path through the material.|Required practical
Why keep wire diameter constant in a resistance-length experiment?|Cross-sectional area also affects resistance and would otherwise be a confounding variable.|Required practical
Why allow a wire to cool between resistance measurements?|Temperature changes resistance, so heating could obscure the effect of length.|Required practical
`);
  science('p3',`
What mass occupies 0.002 m³ at density 800 kg/m³?|m = ρV = 800 × 0.002 = 1.6 kg.|Calculation
What is the density of 3 kg occupying 0.0015 m³?|3 ÷ 0.0015 = 2000 kg/m³.|Calculation
What volume has a 540 g block measuring 6 cm × 5 cm × 3 cm?|90 cm³, so its density is 540 ÷ 90 = 6 g/cm³.|Calculation
Water rises from 25 to 42 cm³ when a stone is submerged. Find its volume.|42 − 25 = 17 cm³, assuming full submersion with no trapped air.|Calculation
Why remove air bubbles during displacement measurements?|Bubbles add displaced volume and would make the calculated solid density too low.|Required practical
Why subtract the empty cylinder's mass for liquid density?|Only the liquid's mass belongs in mass ÷ liquid volume.|Required practical
Why can a regular block's volume be uncertain?|Each measured dimension has uncertainty, which affects their multiplied volume.|Measurement
Convert 1500 g to kg.|1500 ÷ 1000 = 1.5 kg.|Units
Convert 250 cm³ to m³.|250 ÷ 1,000,000 = 0.000250 m³.|Units
How many kg/m³ equal 1 g/cm³?|1000 kg/m³. Convert both mass and volume units consistently.|Units
Why do particles in a solid vibrate rather than remain motionless?|They have kinetic energy even though held near fixed positions.|Particle model
Why do liquids not usually compress much?|Their particles are already close together, leaving little space to reduce.|Particle model
Why does a gas spread throughout a container?|Particles move randomly and are widely separated, occupying the available space.|Particle model
What happens to particle speed on average as gas temperature rises?|Average kinetic energy increases and particles move faster on average.|Particle model
Why does heating not always raise temperature?|During a state change, transferred energy changes particle separation and potential energy instead.|Internal energy
Why does melting leave a substance's chemical identity unchanged?|The arrangement and motion change, but its constituent particles are not converted into a different substance.|State changes
Why can evaporation cool the remaining liquid?|Higher-energy particles escape, lowering the average kinetic energy of those remaining.|State changes
Why does evaporation happen below boiling temperature?|Some surface particles have enough energy to escape even when the bulk liquid is cooler than its boiling point.|State changes
Why does greater surface area often speed evaporation?|More particles are at the surface and able to escape under comparable conditions.|State changes
Why does condensation transfer energy to surroundings?|Particles lose energy as they join the liquid, releasing energy from the substance.|State changes
How much energy vaporises 0.1 kg with L = 2,260,000 J/kg?|E = mL = 226,000 J.|Calculation
How much mass melts with 16,700 J if L = 334,000 J/kg?|m = E/L = 0.05 kg.|Calculation
A 0.5 kg sample absorbs 100,000 J during melting. Find L.|100,000 ÷ 0.5 = 200,000 J/kg.|Calculation
Why does a boiling pure liquid's temperature remain steady at constant pressure?|Energy supplies the change of state rather than increasing average kinetic energy until boiling is complete.|Heating curves
How is cooling-curve freezing related to melting?|Energy is released during freezing at the same transition temperature under the same conditions.|Cooling curves
Why can a heating curve's sloped section have different steepness for different substances?|Different specific heat capacities cause different temperature rises for equal energy input per unit mass.|Data interpretation
Why are pressure units not the same as force units?|Pressure is force per unit area, measured in pascals; force alone is measured in newtons.|Gas pressure
Why do gas particles exert forces on container walls?|Their collisions change momentum, exerting forces whose average per area is pressure.|Gas pressure
Why does measuring temperature in one location need care?|Poor thermal contact or uneven heating may make the reading unrepresentative of the whole sample.|Measurement
Why should a density investigation include repeat measurements?|Repeats reveal variation and help assess reliability, but do not remove a consistently miscalibrated scale.|Evaluation
`);
  science('p4',`
How many neutrons are in carbon-14 with atomic number 6?|14 − 6 = 8 neutrons.|Calculation
What stays unchanged when a neutral atom becomes an ion?|Its nucleus and proton number remain unchanged; electron number changes.|Atomic structure
Why does an emitted electron-transition photon have a specific energy?|It corresponds to the energy difference between two electron levels.|Atomic structure
What is the approximate atom radius expressed in nanometres?|About 0.1 nm, equivalent to 1 × 10⁻¹⁰ m.|Units
Why is the nucleus much smaller than the whole atom?|Its radius is less than about one ten-thousandth of the atom's radius in the GCSE comparison.|Atomic structure
Why did alpha particles approaching the nucleus change direction?|Repulsion between the positive alpha particle and positive nucleus deflected their paths.|Atomic models
Why is radioactive decay described as random?|It is not possible to predict exactly when an individual unstable nucleus will decay.|Decay
Why can a decay curve still be predictable for a large sample?|Large numbers give a stable statistical pattern despite random individual events.|Decay
Why do radioactive emissions come from the nucleus rather than chemical bonds?|Radioactivity is a change in an unstable nucleus, unlike ordinary chemical rearrangements of electrons.|Decay
What charge does a beta-minus particle carry?|−1 relative charge, because it is an electron.|Radiation properties
Why does gamma radiation not bend in an electric field?|It has no electric charge.|Radiation properties
Why can alpha and beta deflect in opposite directions in a field?|They have opposite charges: alpha positive and beta-minus negative.|Radiation properties
Why does alpha radiation ionise matter strongly over a short range?|Its relatively large charged particles interact strongly and transfer energy rapidly to surrounding matter.|Radiation properties
Why is internal alpha contamination particularly hazardous?|Its ionising particles can deposit energy directly in nearby living cells without needing to penetrate skin.|Hazards
Why does irradiation normally stop when the source is removed?|The exposure ends when emitted radiation no longer reaches the object, provided contamination has not occurred.|Hazards
Why can contaminated clothing remain a radiation source?|Radioactive material attached to it continues to emit radiation.|Hazards
Why is a radioactive source stored in suitable shielding?|Shielding reduces exposure outside storage; its type must suit the emissions.|Safety
Why is a detector reading without the source needed?|It estimates background radiation so the source's contribution can be separated.|Measurement
A detector reads 75 counts/s with source and 15 without. Find corrected count rate.|75 − 15 = 60 counts/s.|Calculation
A corrected count rate falls from 60 to 15 counts/s. How many half-lives passed?|Two: 60 → 30 → 15.|Calculation
What fraction of original nuclei remains after four half-lives?|1/16, or 6.25%.|Calculation
What percentage has decayed after two half-lives?|75% has decayed because 25% remains.|Calculation
A 10 h half-life sample starts at 320 Bq. Find activity after 30 h.|Three half-lives: 320 → 160 → 80 → 40 Bq.|Calculation
A sample's activity halves in 6 days. How long to reach one-quarter?|12 days, which is two half-lives.|Calculation
Why must a half-life graph use background-corrected readings?|Uncorrected readings approach the background level instead of zero, distorting apparent halvings.|Data interpretation
Why are repeat radiation readings often different?|Random decay and detection produce fluctuations even when conditions remain the same.|Measurement
Why take readings for longer intervals in counting experiments?|More events can reduce relative statistical uncertainty; school safety controls must still be followed.|Measurement
If an alpha-decaying nucleus has mass number 210, what is the daughter's mass number?|206, because an alpha particle carries four nucleons.|Nuclear equations
If beta-minus decay starts with atomic number 6, what is the daughter's atomic number?|7, because a neutron changes into a proton; mass number stays unchanged.|Nuclear equations
Why does adding heat not reliably accelerate nuclear decay in ordinary conditions?|Decay is a nuclear process and is not controlled by the chemical reaction rates familiar in heated substances.|Decay
`);
  function literature(id,rows) {
    const deck=decks.find(d=>d.id===id), originals=new Map(deck.cards.map(c=>[c.id,c]));
    const prefix={macbeth:'mac-','christmas-carol':'acc-','inspector-calls':'aic-'}[id];
    rows.trim().split('\n').forEach((line,i)=>{
      const [question,answer,method,focus]=line.split('|');
      const quoteSource=originals.get(prefix+String(i+1).padStart(2,'0'));
      deck.cards.push({id:id+'-extension-'+String(i+1).padStart(2,'0'),question,answer,quote:quoteSource.quote,method,
        exam:'Build an argument about '+focus.toLowerCase()+'. Use the quotation as evidence, explain its effect and link to the wider text.',tags:[focus.toLowerCase(),'close reading']});
    });
  }
  literature('macbeth',`
Why does Macbeth's early reputation make his later tyranny more tragic?|He begins with public honour earned by defending Scotland. His later violence destroys the qualities that once made him valuable, so the fall is a transformation rather than inevitable villainy.|Contrast the soldier's approving judgement with the country's later suffering; track how violence changes purpose.|Tragic structure
What does the contrast between stars and black desires suggest about moral awareness?|Macbeth imagines light exposing his ambition. Wanting concealment shows he recognises its moral danger before Duncan's murder, complicating the claim that the witches control him completely.|Analyse the opposition of light and darkness, then explain why choosing secrecy implies responsibility.|Choice
How does the horse-riding image anticipate Macbeth's downfall?|Vaulting suggests an excessive leap that can overshoot its goal. Ambition energises him but lacks a legitimate justification, foreshadowing the instability of the kingship he seeks.|Connect the metaphor's movement with the tragic pattern of reaching too far and falling.|Ambition
Does Lady Macbeth's appeal to spirits prove cruelty is naturally masculine?|No. Her language adopts a gender ideology associating compassion with femininity, while the play later presents humane feeling as compatible with manhood.|Distinguish the character's beliefs from Shakespeare's overall presentation; compare Macduff.|Gender
Why is the imagined attack on a baby so shocking?|Maternal protection is inverted into deliberate violence. Lady Macbeth uses this extreme hypothetical image to shame Macbeth into treating commitment as more important than conscience.|Explain the contrast between nurturing expectations and brutality; do not describe an actual murder she commits.|Manipulation
How does the serpent image connect deception with moral corruption?|A threatening creature hides beneath an attractive surface. Biblical associations can evoke temptation, but the central dramatic effect is the gap between appearances and intentions.|Name the simile or image, identify the hidden danger and connect it with Duncan's misplaced trust.|Appearance and reality
Why does the audience's knowledge make Duncan's welcome uncomfortable?|The audience knows the hosts intend betrayal while Duncan reads the castle as pleasant. This unequal knowledge exposes his vulnerability and intensifies suspense.|Define dramatic irony through what audience and character know, not simply an incorrect statement.|Dramatic irony
Why does Macbeth question the dagger rather than confidently identify it?|The interrogative stages uncertainty about perception and conscience. The apparition can be read as supernatural temptation or an outward image of his violent intention.|Offer a supported alternative reading while keeping Macbeth's decision to follow it central.|Supernatural
How does the murder of sleep image extend beyond one victim?|Sleep symbolises restoration and innocence. Destroying it suggests Macbeth has harmed his own capacity for peace as well as Duncan's life.|Explain the abstract victim of the personification and connect it with later sleeplessness and fear.|Guilt
Why is an ocean disproportionate to the blood on Macbeth's hand?|The physical stain is small, but imagined guilt is vast. Hyperbole turns washing into an impossible task, suggesting moral consequences cannot be removed materially.|Move from the literal hand to symbolic guilt; analyse the scale of the ocean.|Guilt
How does Lady Macbeth's water claim set up a later reversal?|She initially treats murder as a manageable physical stain. Her sleepwalking exposes the failure of that confidence when imagined blood cannot be removed.|Compare early practical certainty with later compulsive washing rather than analysing each scene in isolation.|Structural contrast
Why is Banquo's warning important to a fate-versus-choice argument?|He recognises that partial truth can lure people towards harm. His caution shows another response to the witches is possible, making Macbeth's response a choice.|Use Banquo as a foil and explain how accurate predictions can still be deceptive.|Choice
How does the witches' opening paradox prepare the audience for deception?|Opposed moral terms are made interchangeable, unsettling trustworthy judgement. The pattern anticipates promises whose apparent benefit conceals danger.|Explain the contradiction and trace its relevance to later equivocal prophecies.|Appearance and reality
Why does the promise of kingship focus Macbeth on the future?|The greeting offers a desirable identity before he has earned or received it. It stimulates ambition but does not explicitly command him to murder Duncan.|Distinguish prediction from instruction when arguing about the witches' responsibility.|Ambition
Why does Macbeth's fear of Banquo undermine the value of becoming king?|Gaining the crown does not produce security. Fear of Banquo's descendants turns achievement into anxiety and encourages further violence.|Analyse the contrast between possessing political power and lacking inward confidence.|Power
How does Macbeth's affectionate address conceal a changed marriage dynamic?|Tender language accompanies withholding the murder plan. He now controls violent decisions without relying on Lady Macbeth, reversing their earlier relationship.|Explain the tension between apparent affection and exclusion from knowledge.|Relationships
Why are scorpions an effective image of mental torment?|They suggest painful, poisonous threats within his own mind. The danger is internal, so external authority cannot protect him from it.|Identify the plural creatures and the location inside the mind; link kingship with insecurity.|Psychology
Why does denying Banquo's murder reveal Macbeth rather than protect him?|His public response introduces precisely the violent responsibility he wants hidden. Other guests cannot see the ghost, so his private fear disrupts his public performance.|Connect dialogue, stage visibility and the collapse of controlled appearances.|Drama
Why is the blood-river argument a rationalisation rather than a necessity?|Macbeth presents retreat as too difficult, but he still chooses further violence. The metaphor makes past wrongdoing an excuse for new wrongdoing.|Explain the spatial trap he imagines without accepting it as proof that repentance is impossible.|Responsibility
How do the repeated commands during sleepwalking expose lost control?|Lady Macbeth's language still tries to order things, but no command removes the imagined stain. The form echoes her earlier authority while demonstrating its failure.|Track imperative verbs and repetition; compare the effect of commanding Macbeth earlier.|Guilt
Why does smell make Lady Macbeth's guilt harder to escape?|The stain becomes a sensory experience beyond sight. Even imagined perfumes cannot disguise it, suggesting guilt permeates her whole perception.|Analyse sensory imagery and the contrast between immense perfume resources and a small hand.|Imagery
How does the repeated time word change the pace of Macbeth's speech?|Repetition creates a dragging rhythm, making each day seem indistinguishable. His desired future has become empty continuation rather than triumph.|Discuss sound and pacing before linking them to his emotional response to loss.|Time
Why does the shadow metaphor diminish human ambition?|A shadow has little substance and soon disappears. Macbeth's quest for lasting greatness ends with a view of life as brief and insubstantial.|Connect the figurative image with the endpoint of his tragic development.|Tragic structure
How does Malcolm's list provide a standard for judging Macbeth?|The virtues define kingship by moral conduct rather than possession of a crown. Macbeth's rule can then be judged against truth, restraint and justice.|Use the list as a foil and select a specific contrast rather than asserting Malcolm is perfect.|Kingship
Why does Macduff's response challenge emotional repression?|He refuses to separate masculinity from grief. Feeling loss is presented as necessary before action, unlike Lady Macbeth's use of manhood to demand cruelty.|Compare two constructions of masculinity and explain which actions follow them.|Gender
Why does the revelation about Macduff expose equivocation?|Macbeth interprets the prophecy as an absolute guarantee, but its wording permits an unexpected exception. His confidence rests on a narrow reading.|Explain the gap between literal wording and assumed meaning; avoid saying the witches simply lied.|Supernatural
How does personifying Scotland widen the consequences of Macbeth's actions?|The country becomes a wounded victim, showing tyranny affects communities rather than only the ruler's conscience.|Move from the nation's imagined body to collective suffering and failed leadership.|Kingship
Why does acclaiming Malcolm contrast with Macbeth's route to power?|Public recognition marks restoration after secret betrayal and coercion. It suggests legitimate authority depends on more than a ruler's private ambition.|Analyse the ending as a structural contrast while recognising the play's violent cost.|Resolution
Why does repeating false connect inner intention with outward performance?|The repeated adjective binds deceptive appearance to conscious knowledge of wrongdoing. Macbeth is not merely mistaken about his own motives.|Trace face versus heart and explain the deliberate concealment implied by the modal verb.|Deception
How does a fruitless crown connect kingship with succession anxiety?|The image suggests power without an enduring line of heirs. Macbeth resents a future that benefits Banquo's descendants, making the crown feel incomplete.|Explain the fertility metaphor and link it to his decision to target Banquo.|Succession
`);
  literature('christmas-carol',`
How does the piling-up of verbs shape the reader's first judgement of Scrooge?|Accumulated grasping actions make greed seem habitual and overwhelming. The narrator's energetic condemnation invites readers to reject his values before the ghosts arrive.|Discuss the cumulative list and its negative connotations rather than identifying only one adjective.|Characterisation
How can the oyster simile allow hope as well as criticism?|The shell suggests emotional closure, but an oyster can contain something valuable. This possible reading leaves room for goodness beneath Scrooge's defensive exterior.|Present the pearl association as an interpretation, not an explicit fact stated by the narrator.|Redemption
Why is Scrooge's resistance to warmth more than a weather description?|It makes emotional coldness seem ingrained: ordinary seasonal warmth cannot soften him. His later generosity reverses this association.|Connect external temperature imagery with inner feeling and structural change.|Isolation
Why do Scrooge's questions about institutions reveal avoidance?|He substitutes punitive public institutions for personal compassion. Asking about their existence lets him evade the collectors' appeal rather than investigate people's needs.|Explain the rhetorical function of the questions and connect it with responsibility.|Poverty
How does population language dehumanise vulnerable people?|It replaces individuals with an apparently surplus quantity. Dickens later gives poverty a personal face through the Cratchits and Tiny Tim.|Contrast abstract economic language with named characters and consequences.|Social criticism
Why is Fred a useful foil even though he cannot initially change Scrooge?|He articulates values of forgiveness and fellowship that expose Scrooge's isolation. The invitation remains available for Scrooge's eventual return.|Analyse contrasting attitudes and Fred's continuing offer rather than simply calling him cheerful.|Relationships
How does Marley redefine business in his warning?|He changes it from financial transactions to responsibility towards humanity. The warning challenges Scrooge's assumption that profit fulfils his duties.|Analyse the double meaning of business and its ethical reinterpretation.|Responsibility
Why does Marley describe his punishment as something he forged?|It links the chain to repeated choices during life. The punishment is self-created, making it a warning that Scrooge can still choose differently.|Explain the extended metaphor and agency in the verb forged.|Consequences
Why show Scrooge's neglected childhood after presenting his greed?|Memory complicates condemnation by revealing loneliness and vulnerability. It helps readers understand his defences without excusing their harmful effects.|Distinguish explanation from justification and discuss the ordering of revelations.|Structure
How does Fan challenge the idea that Scrooge never knew affection?|Her welcome shows he experienced love and belonging. Remembering it can reconnect him with values he has suppressed.|Connect the repeated promise of home with emotional security and later family relationships.|Family
Why is Fezziwig's generosity not measured only in money?|His warmth and treatment of workers create happiness disproportionate to the financial cost. Dickens presents employer power as an ethical responsibility.|Analyse the comparison with fortune and link influence to workers' well-being.|Employers
How does Belle's idol metaphor connect money with misplaced devotion?|Gold has replaced love as Scrooge's highest commitment. Religious language presents greed as an object of worship that distorts priorities.|Explain the figurative substitution rather than claiming Belle objects to all financial security.|Greed
Why does the Ghost of Christmas Present's abundance matter structurally?|It contrasts with Scrooge's restricted, miserly world. Its hospitality exposes the possibility of shared pleasure rather than private accumulation.|Connect visual presentation with the ghost's teaching role.|Generosity
How can praise of a modest goose challenge material definitions of happiness?|The family's delight depends on appreciation and shared celebration, not lavish wealth. Dickens values their affection without claiming poverty is harmless.|Explain the appreciative exaggeration alongside the family's continuing hardship.|Family
Why should the Cratchits' happiness not be used to argue poverty does not matter?|Their affection coexists with insecurity and Tim's threatened death. Dickens shows moral worth among poor people while demanding material concern.|Hold positive family feeling and social vulnerability together in the same argument.|Poverty
How does conditional wording keep Tiny Tim's future from being fixed?|His death depends on circumstances remaining unchanged. The warning makes action and social responsibility capable of altering the outcome.|Examine the conditional sentence and connect it to Scrooge's later intervention.|Change
Why does Tiny Tim's hope give him moral agency?|He thinks about what others might learn from seeing him rather than being only an object of pity. Christian references connect vulnerability with compassion.|Explain what Tim wishes others to remember and avoid reducing him to illness alone.|Religion
Why personify social problems as children?|Children embody vulnerability and society's future. Ignorance and Want turn abstract failures into disturbing figures that demand recognition.|Explain allegory, naming and the contrast with festive abundance.|Social criticism
How does the final ghost's silence make Scrooge confront his own fears?|Without comforting explanation, he must interpret scenes and recognise the possible consequences of his life. Silence makes the future threatening and uncertain.|Analyse the absence of dialogue as a narrative technique, not a lack of significance.|Supernatural
Why does the lunch comment reveal failed social relationships?|Attendance at a funeral is reduced to personal benefit. Scrooge's transactional life produces people who value his death only as an opportunity.|Explain the irony of his profit-focused values returning in others' response.|Isolation
Why is promising year-round Christmas more important than one generous day?|It commits Scrooge to lasting conduct rather than a temporary festive mood. Redemption must change ordinary relationships and duties.|Link duration in the promise with later practical actions.|Redemption
How do the joyful similes reverse Scrooge's earlier imagery?|Lightness and happiness replace heaviness, coldness and closure. His changed language makes emotional renewal audible.|Compare specific early and late images rather than just stating he is different.|Structural contrast
Why does raising Bob's salary matter beyond apologising?|It changes material conditions using Scrooge's power as an employer. Generosity becomes action that supports a struggling household.|Connect personal reform with practical economic responsibility.|Social change
Why does the final three-part description extend beyond Scrooge's feelings?|Friend, employer and person identify several social roles. His reform is measured through relationships and behaviour, not only private happiness.|Analyse the parallel structure and the widening scope of goodness.|Character development
How does the final universal blessing support the novella's message?|It includes everyone, countering exclusion and the idea of surplus people. A vulnerable child voices the communal ideal.|Explain inclusive language and its position at the close.|Community
Why is invasive fog an effective opening atmosphere?|It makes the setting oppressive and penetrates boundaries. The murky environment complements emotional and social obscurity before enlightenment.|Link setting to mood while distinguishing an interpretive parallel from literal causation.|Setting
How does the darkness comment combine comedy and criticism?|A practical saving becomes evidence of Scrooge's excessive miserliness. The narrator makes an everyday preference reveal a moral habit.|Explain the brisk evaluative voice and the connection between money and isolation.|Narrative voice
Why can the first ghost's light be associated with difficult knowledge?|Illumination exposes memories Scrooge would rather suppress. Learning requires facing an uncomfortable past rather than preserving ignorance.|Connect light imagery with revelation and Scrooge's resistance.|Memory
How does the contrast between future certainties and possibilities support redemption?|Scrooge asks whether visions are inevitable. The distinction makes the future a warning that can guide changed choices.|Analyse modal verbs and connect uncertainty with agency.|Choice
Why does the additional father image complete Scrooge's social reintegration?|He becomes a source of sustained care in another family. His earlier exclusion is reversed through responsibility, not simply improved mood.|Connect family imagery with his concrete support for Tim and Bob.|Family
`);
  literature('inspector-calls',`
Why does comfort without homeliness matter in the opening setting?|Material success does not guarantee emotional warmth. The home establishes prosperity while hinting at strained or artificial relationships.|Analyse the contrast in the stage directions and avoid equating expensive objects with moral worth.|Class
How does Birling's advice make responsibility seem narrowly individual?|He defines duty around personal interests, excluding those affected by business choices. The Inspector later challenges that limited circle.|Compare the scope of the two speakers' moral obligations.|Responsibility
Why would the Titanic prediction affect a post-war audience's trust?|They know the prediction fails, so confident repetition exposes unreliable judgement. This weakens Birling's claims about society as well as shipping.|Explain the audience's historical knowledge and the effect on authority.|Dramatic irony
How does the honours ambition connect status with anxiety?|Birling seeks elite recognition and fears reputational damage. His confidence depends partly on approval from those above him.|Connect social aspiration with his response to the investigation.|Status
Why is Sheila's defence of workers significant within a privileged family?|She recognises humanity beyond cheap labour, challenging her father's economic framing. Her insight also contrasts with her earlier misuse of consumer power.|Explain change without treating her as faultless from the start.|Class
What does Sheila's direct apology reveal about moral learning?|She accepts agency and expresses regret rather than hiding behind status or legal technicalities. Her response opens the possibility of change.|Analyse first-person responsibility and compare defensive responses.|Generations
How does the unfinished class phrase expose Mrs Birling's assumptions?|She categorises Eva before considering her individual circumstances. The interruption-like dash suggests dismissive judgement rather than careful evidence.|Explain stereotyping and the social distance built by the demonstrative phrase.|Prejudice
Why is Mrs Birling's charity role morally ironic?|An institution meant to assist vulnerable people becomes a means of refusal and control. Her authority does not ensure compassion.|Connect institutional purpose with her action instead of assuming all charity is harmful.|Power
How does Eric's collective pronoun widen blame?|It places several family members within the chain of harm. Responsibility is shared even though their actions differ.|Analyse the pronoun and distinguish collective responsibility from identical guilt.|Responsibility
Why should Eric's euphemistic account not excuse his behaviour?|Casual language minimises coercion and harm. Priestley exposes the imbalance between his privilege and Eva's vulnerability rather than presenting intoxication as justification.|Contrast softened wording with serious consequences.|Gender and power
What imbalance does Gerald's comparison of feelings reveal?|Eva's emotional investment exceeded his. His control over money and the relationship limits how far his rescue narrative can be accepted.|Evaluate both material help and unequal dependency rather than choosing a wholly heroic reading.|Relationships
How does the body metaphor challenge Birling's individualism?|It makes society an interconnected whole whose members cannot be morally separated. Harm to one person matters to the collective.|Explain the metaphor's implication, not just its technique name.|Community
Why can the Inspector's warning carry both historical and moral meanings?|A later audience can associate it with wars after 1912, while its violence also warns of consequences when social responsibility is ignored.|Present the historical resonance as supported interpretation rather than a prediction of one exact event.|Context
How does Sheila's rope metaphor show she understands the investigation?|She recognises that evasive speech can reveal wrongdoing. The Inspector often lets characters expose their own inconsistencies.|Explain the trap as figurative self-exposure rather than literal punishment.|Drama
Why does Birling's mocking tone suggest incomplete change?|He returns to superiority and treats distress as a joke once official consequences appear doubtful. His concern was exposure more than ethical responsibility.|Compare his final attitude with the younger characters' continuing remorse.|Generations
Why does Sheila's refusal to resume the engagement resist a simple happy ending?|She will not pretend the investigation changed nothing. Reconciliation must depend on genuine development, not a return to comfortable appearances.|Connect relationship change with the play's unresolved moral test.|Change
How can Eva's ordinary surname extend her significance?|It allows her to represent many vulnerable working-class people as well as an individual. Symbolic meaning should not erase the specific harms she experiences.|Balance representative naming with personal circumstances.|Class
How does the telephone ending force the audience to reassess closure?|A new death and investigation overturn the family's apparent escape. The repeated situation makes their response to moral knowledge the central issue.|Explain cyclical structure and the interruption of relief.|Structure
Why does interrupting Birling's speech with the doorbell matter?|The Inspector arrives as self-centred advice is being given, creating an immediate challenge to it. Sound and timing turn an ideological contrast into action.|Link the sound cue to the speech it interrupts.|Stagecraft
How can changed lighting represent the Inspector's function?|Comforting intimacy gives way to exposure and scrutiny. The visual environment makes the investigation feel harder to evade.|Explain stage lighting as a director-facing instruction with a symbolic audience effect.|Stagecraft
What does dismissing community as nonsense reveal about Birling's reasoning?|He rejects a principle before engaging with its consequences, protecting his individualist position. The Inspector demonstrates what that dismissal overlooks.|Analyse the evaluative noun and contrast it with the chain of harm.|Ideology
Why does Eric's mixed introductory description foreshadow tension?|Shyness and assertiveness pull in different directions, suggesting discomfort beneath the celebration. Later disclosures develop rather than appear wholly unrelated to that unease.|Connect the paired adjectives with subsequent conflict without claiming a single inevitable interpretation.|Characterisation
How might a performer communicate Mrs Birling's coldness?|Controlled voice, distance or restrained expression can convey emotional detachment, subject to the production's interpretation.|Translate a stage direction into a possible performance choice and explain its effect.|Performance
Why does repeated millions prevent an exclusively family-sized reading?|The Inspector expands Eva's story into a widespread social problem. The audience is invited to consider people outside the stage household.|Explain numerical repetition as rhetorical amplification rather than a precise statistic.|Social criticism
Why does addressing public men connect privilege with obligation?|Public authority affects others, so the Inspector argues it should increase responsibility rather than excuse harm.|Link social position, consequences and the challenge to Birling.|Power
How does calling the investigation moonshine trivialise its lessons?|Birling reduces disturbing evidence to something unreal or foolish. The word lets him avoid moral scrutiny once he doubts official authority.|Contrast dismissive language with events the characters themselves admitted.|Denial
Why does casual talk about drinking contribute to the opening atmosphere?|It presents apparently harmless celebration, while later disclosures expose serious behaviour beneath the surface. Light tone becomes retrospectively uneasy.|Explain the structural contrast without treating one colloquial word as proof of all later events.|Appearance and reality
How does the complaint about Eva using a name reveal class entitlement?|Mrs Birling treats identity as a privilege she controls and takes offence rather than considering need. Social respectability becomes a barrier to assistance.|Analyse whose feelings and interests receive priority in her response.|Class prejudice
Why can the word wretched expose distance from Eva?|Depending on tone, it may register pity or dismissive irritation. Birling's surrounding concern with scandal supports a reading of limited compassion.|Use surrounding dialogue to choose a defensible reading instead of assigning a word one fixed meaning.|Language analysis
Why is the generation divide more complex than young equals good?|Younger characters also cause harm, but are more willing to acknowledge it. The distinction concerns capacity to learn rather than innocence.|Compare actions before the investigation with responses afterwards.|Generations
`);
  function general(id,rows) {
    const deck=decks.find(d=>d.id===id);
    rows.trim().split('\n').forEach((line,i)=>{
      const [question,answer,focus,exam]=line.split('|');
      deck.cards.push({id:id+'-extension-'+String(i+1).padStart(2,'0'),question,answer,tags:[focus],exam:exam||'Use precise evidence and explain how the cause or process produces the stated consequence.'});
    });
  }
  general('cold-war',`
Why did Germany's currency reform contribute to the Berlin crisis?|Western introduction of a new currency in 1948 signalled economic integration of their zones. Stalin opposed this development and used access to West Berlin as leverage.|Berlin 1948
How did the airlift undermine the purpose of the Berlin Blockade?|It supplied West Berlin without abandoning the city or directly attacking the blockade, showing continued Western commitment.|Berlin 1948
What consequences followed the failure of the Berlin Blockade?|It strengthened Western cooperation and distrust of Stalin, contributing to consolidation of opposing blocs and separate German states.|Berlin 1948
Why was the arms race a source of fear as well as deterrence?|Larger nuclear arsenals discouraged direct attack but increased the possible devastation of miscalculation.|Arms race
How did Khrushchev's Secret Speech affect expectations in Eastern Europe?|His 1956 criticism of Stalin encouraged hopes of reform, but did not mean the USSR would accept losing control of its allies.|Hungary 1956
Why did Nagy's promise to leave the Warsaw Pact raise the stakes?|It threatened the Soviet security system, moving the crisis beyond limited domestic reforms.|Hungary 1956
How did East German emigration create an economic problem before the Wall?|Departures through Berlin included skilled workers, weakening East Germany's workforce and embarrassing its government.|Berlin 1961
How did the Wall change Berlin without resolving the ideological conflict?|It stopped most cross-border movement and stabilised East German control, but physically embodied division and restricted freedom.|Berlin 1961
Why did Kennedy choose a naval quarantine during the Cuban crisis?|It applied pressure and limited further deliveries while avoiding the immediate risks of an air strike or invasion.|Cuba 1962
What did the public Cuban Missile Crisis settlement require?|Soviet missiles were removed from Cuba and the USA publicly pledged not to invade Cuba.|Cuba 1962
What secret US concession accompanied the Cuban settlement?|The USA agreed to remove Jupiter missiles from Turkey, allowing a compromise beyond the public exchange.|Cuba 1962
Why was the Washington–Moscow hotline created in 1963?|It aimed to improve direct communication and reduce dangerous delays or misunderstandings during future crises.|Cuba aftermath
Why did Soviet leaders fear Dubček's reforms spreading?|Looser control in one allied state might encourage challenges elsewhere, threatening bloc cohesion.|Prague 1968
How did the invasion of Czechoslovakia reveal limits to reform?|The USSR tolerated only changes compatible with continued communist and Soviet control, using force when leaders judged that endangered.|Prague 1968
Why could Helsinki's human-rights commitments matter despite weak enforcement?|Dissidents could use the agreed principles to publicise governments' failures, creating moral and diplomatic pressure.|Détente
Why did the Afghanistan invasion complicate SALT II?|US distrust intensified, and the treaty was not ratified by the US Senate, undermining the détente process.|Second Cold War
How did economic problems influence Gorbachev's foreign policy?|Reducing military burdens and improving external relations could support reform at home, making confrontation less attractive.|End of Cold War
`);
  general('henry-pending',`
How did the 1513 Battle of the Spurs support Henry's image?|Victory over French forces and captures of towns allowed him to claim martial glory, though the wider campaign's gains were limited and costly.|Foreign policy
Why did the 1513 victory at Flodden matter while Henry was in France?|The defeat of invading Scottish forces and death of James IV reduced a northern threat; Catherine acted as regent during Henry's absence.|Foreign policy
Why did Charles V's power make England a junior diplomatic partner?|The Emperor controlled extensive territories and resources, so English ambitions often depended on a stronger ally's priorities.|Foreign policy
How did the Battle of Pavia in 1525 frustrate Henry's ambitions?|Charles defeated and captured Francis I, but Henry lacked the resources and support to exploit the victory as he hoped.|Foreign policy
Why was an annulment different from a divorce in Henry's argument?|An annulment declared a marriage invalid from the start. Henry disputed the validity of marriage to his brother's widow rather than simply seeking a modern divorce.|King's Great Matter
How did the 1527 Sack of Rome affect the annulment campaign?|Clement VII was vulnerable to Charles V, Catherine's nephew, making agreement to Henry's request politically difficult.|King's Great Matter
Which 1539 law demonstrated Henry's continuing traditional religious doctrine?|The Act of Six Articles reaffirmed traditional beliefs and practices despite the break with Rome.|Religious change
How did Robert Aske contribute to the Pilgrimage of Grace?|He helped organise and articulate the Yorkshire rebels' grievances, presenting the movement as loyal religious protest rather than a simple bid to depose Henry.|Rebellion
`);
  general('medicine',`
Why did medieval urine charts not establish germ causes?|They classified visible features through existing humoral theory rather than identifying microorganisms.|Medieval diagnosis
Why could astrology influence medieval treatment timing?|Physicians linked bodies and disease to celestial positions within accepted medical explanations.|Medieval beliefs
How did the Church influence Galen's authority?|His ideas were compatible with religious interpretations and were preserved in accepted learning, discouraging challenges.|Continuity
Why was bloodletting logical within humoral theory?|If illness came from excess blood or imbalance, removing blood appeared to restore balance even though the explanation was wrong.|Medieval treatment
How did anatomical dissection differ from simply copying old diagrams?|It allowed observation of actual human structures and could reveal errors in inherited authorities.|Renaissance knowledge
Why did Vesalius correcting anatomy not immediately cure infections?|Knowledge of structure improved, but causes of infection and effective antimicrobial treatments remained unknown.|Change and limits
Why did Jenner's vaccination not depend on understanding germ theory?|He established protection through observation and experimentation before the microbial explanation was available.|Vaccination
How did opposition to compulsory vaccination show government's growing role?|Prevention increasingly involved public policy, but legal requirements could generate resistance over safety and personal liberty.|Public health
Why did Snow's pump investigation not immediately convince everyone?|The established miasma explanation remained influential and a microbial mechanism had not yet been accepted widely.|Cholera
How did improved microscopes help germ theory research?|They enabled study of microorganisms that were invisible to the naked eye, supporting experimental investigations.|Technology
Why was chloroform not a complete solution to surgical danger?|It reduced pain but did not prevent infection or blood loss, leaving major causes of death unresolved.|Surgery
Why did antiseptic surgery face initial resistance?|New methods could be inconvenient and irritating, while some surgeons doubted germ theory or disliked changing practice.|Surgery
How did aseptic operating conditions differ from spraying wounds?|They sought to prevent microbes entering through sterile equipment, cleaned environments and protective clothing.|Surgery
Why did war accelerate penicillin production rather than cause its original discovery?|Fleming's 1928 observation preceded the war; wartime need and investment helped later development and mass manufacture.|Modern medicine
Why did blood-group knowledge matter for transfusions?|Compatible donor blood reduced dangerous reactions, making transfusions safer than indiscriminate transfer.|Western Front
How did sodium citrate assist wartime transfusion?|It prevented donated blood clotting, helping storage and transport rather than requiring donor and recipient together.|Western Front
`);
  general('natural-hazards',`
How does exposure differ from vulnerability in hazard risk?|Exposure concerns people or assets in the hazard's path; vulnerability concerns how susceptible they are to harm.|Risk
Why can rapid urban growth increase hazard losses?|More people and buildings may occupy unsafe locations, while infrastructure and planning struggle to keep pace.|Risk
Why is earthquake magnitude not the only control on deaths?|Depth, distance, building quality, population density and preparedness also affect impact.|Tectonic hazards
How does friction build earthquake risk at a locked margin?|Moving plates are temporarily stuck, accumulating strain until sudden movement releases energy.|Tectonic hazards
Why are shallow earthquakes often especially damaging nearby?|Energy is released close to the surface, so strong shaking can reach buildings with less attenuation.|Tectonic hazards
Why can an earthquake trigger a landslide?|Shaking destabilises slopes, producing a secondary hazard beyond the original ground movement.|Tectonic hazards
Why can damaged water pipes worsen earthquake impacts?|Loss of clean water and sanitation can contribute to disease and hamper emergency services.|Effects
Why is restoring livelihoods a long-term response?|Rebuilding businesses and employment supports recovery after immediate rescue and shelter needs.|Responses
Why can geothermal energy attract settlement near volcanoes?|Underground heat can provide energy and income, creating benefits despite hazard exposure.|Living with hazards
How can earthquake-resistant construction reduce casualties?|Reinforcement and flexible design help structures withstand shaking rather than collapse readily.|Management
Why are drills useful when exact earthquakes cannot be forecast?|They prepare people to respond quickly even without a reliable prediction of the date and location.|Management
How does rising air near the Equator produce rainfall?|Air cools as it rises, water vapour condenses and cloud and rain can form.|Atmospheric circulation
Why do global circulation belts not explain every local climate detail?|Altitude, oceans, winds and seasonal changes modify broad latitude patterns.|Atmospheric circulation
Why do tropical storms usually form away from the Equator?|Rotation needs sufficient Coriolis effect, which is very weak at the Equator.|Tropical storms
How does condensation supply energy to a tropical storm?|Latent heat released when water vapour condenses helps sustain rising air and low pressure.|Tropical storms
Why is the eyewall more dangerous than the eye?|Intense rising air, heavy rainfall and strong winds surround the relatively calm centre.|Tropical storms
How can a storm bring both coastal and inland flooding?|Surge raises coastal sea levels while intense rainfall overwhelms drainage and rivers inland.|Tropical storms
Why can storm forecasts save lives without preventing the storm?|Warnings allow evacuation and preparation, reducing exposure and vulnerability.|Management
Why do evacuation warnings need transport and accessible shelters?|Advice alone cannot protect people who lack practical means to reach safety.|Management
Why can heatwaves threaten cities particularly strongly?|Dense surfaces store heat and vulnerable residents may lack shade, ventilation or cooling.|UK weather
How can drought reduce farm yields?|Low soil moisture limits growth and water availability for crops and livestock.|UK weather
Why can snow disrupt economic activity?|Transport closures and access problems prevent workers, customers and deliveries reaching destinations.|UK weather
Why does one unusual storm not establish a climate trend?|Climate conclusions require patterns across long records rather than a single weather event.|Climate evidence
How can ice-core gases help reconstruct past atmosphere?|Trapped bubbles preserve samples of earlier air, while other ice measurements inform temperature estimates.|Climate evidence
Why does greenhouse warming not mean all sunlight is trapped?|Greenhouse gases absorb and re-emit some outgoing infrared radiation, not all incoming solar radiation.|Climate causes
Why does melting land ice raise sea level more directly than melting floating sea ice?|Land ice adds water to the ocean; floating ice already displaces water approximately equal to its melt contribution.|Climate effects
How can renewable energy contribute to mitigation?|Replacing fossil-fuel electricity can reduce emissions, though lifecycle impacts and supply systems still matter.|Mitigation
Why is a coastal flood barrier an adaptation rather than mitigation?|It reduces exposure to effects of rising seas but does not directly remove the cause of warming.|Adaptation
Why do climate responses create trade-offs?|Costs, land use and access differ, so environmental benefits and social consequences must be weighed.|Evaluation
How should you compare effects in two named hazard examples?|Use matched categories and accurate place evidence, then explain differences through exposure, vulnerability and response capacity.|Case-study practice
`);
  general('living-world',`
What is a producer in an ecosystem?|An organism making organic material, usually through photosynthesis, providing energy for consumers.|Ecosystems
What is a primary consumer?|An organism feeding on producers rather than directly making its own food by photosynthesis.|Ecosystems
Why do food-chain arrows point from food to eater?|They represent transfer of energy and material from the organism consumed to the consumer.|Ecosystems
Why is energy flow not the same as nutrient cycling?|Energy enters and is dissipated, while nutrients can be reused through organisms, litter and soil.|Ecosystems
How can fewer predators affect prey and vegetation?|Prey numbers may increase and consume more plants, creating indirect effects across the ecosystem.|Ecosystems
Why is a small UK ecosystem useful as a study example?|A pond or woodland allows specific links among living things, soils, water and seasonal change to be explained.|Small-scale ecosystem
How can a pond's oxygen supply affect its animals?|Low dissolved oxygen can restrict respiration and survival, changing populations and feeding relationships.|Small-scale ecosystem
Why do rainforest nutrient stores concentrate strongly in biomass?|Rapid growth incorporates nutrients into vegetation, while fast cycling limits long-lasting litter accumulation.|Rainforests
How does heavy rainfall leach rainforest soils?|Water moving through soil carries dissolved nutrients away from upper layers.|Rainforests
Why does vegetation removal disrupt the rainforest nutrient cycle?|It reduces nutrient storage and litter inputs while exposing soil to leaching and erosion.|Rainforests
Why are drip-tip leaves useful in wet rainforest conditions?|Their shape helps water drain off the leaf surface rather than accumulate.|Rainforest adaptations
How do lianas reach rainforest light?|They climb existing trees, using support rather than investing in a large self-supporting trunk.|Rainforest adaptations
How can camouflage support rainforest animals?|It can help avoid predators or approach prey in a complex vegetation environment.|Rainforest adaptations
Why can cattle ranching cause extensive forest clearance?|Land is converted to pasture to raise livestock, replacing diverse forest habitat.|Deforestation
How can mining affect rainforest water quality?|Disturbed sediment and pollutants can enter waterways, affecting ecosystems and downstream communities.|Deforestation
Why can deforestation alter local water cycling?|Reduced transpiration and interception change moisture movement and runoff patterns.|Deforestation
What is replanting's limit as a replacement for primary rainforest?|A plantation may not recreate the original biodiversity, structure or ecological relationships.|Management
Why can certification support sustainable timber use?|It can make responsible management more visible to purchasers, provided standards are monitored and enforced.|Management
Why might ecotourism fail if poorly managed?|Visitor pressure, waste and unequal sharing of income can damage the environment or reduce local support.|Management
Why can conservation enforcement need local participation?|People affected by restrictions need workable livelihoods and influence, otherwise compliance can be undermined.|Management
How does a cactus's reduced leaf area help in a hot desert?|Spines reduce the surface available for water loss compared with broad leaves.|Hot deserts option
Why do deep or widespread desert roots offer different advantages?|Deep roots can reach groundwater; wide shallow roots rapidly collect water after brief rain.|Hot deserts option
How can desert irrigation create salinisation?|Evaporation leaves dissolved salts in soil, potentially restricting crop growth.|Hot deserts option
Why is desertification not simply a desert moving across a map?|It is degradation of dryland environments through interacting climatic and human pressures.|Hot deserts option
How can overcultivation degrade dryland soil?|Repeated cropping without recovery reduces nutrients and vegetation cover, increasing erosion risk.|Hot deserts option
Why can shelter belts reduce dryland soil loss?|Trees or shrubs reduce wind speed near the ground and help protect soil.|Hot deserts option
Why is tundra vegetation often low-growing?|Low height reduces wind exposure and helps plants survive near the relatively warmer ground.|Cold environments option
How does permafrost thaw threaten buildings and roads?|Previously frozen ground can lose support and subside unevenly.|Cold environments option
Why can cold-region resource extraction be expensive?|Remoteness, severe weather and specialist infrastructure increase construction and operating costs.|Cold environments option
How should a sustainable ecosystem answer judge success?|Assess environmental protection, economic viability and effects on local people using evidence from the chosen place.|Evaluation
`);
  general('uk-landscapes',`
How does rock resistance influence the UK's broad relief?|More resistant rocks tend to persist as higher ground, while less resistant material is eroded more readily, modified by geological history.|UK relief
What is biological weathering?|Breakdown of rock by living things, such as roots widening cracks.|Weathering
How does chemical weathering affect limestone?|Weakly acidic rainwater reacts with and dissolves calcium carbonate.|Weathering
Why is saturated cliff material prone to slumping?|Extra water adds weight and reduces stability, allowing movement along a curved slip surface.|Coasts option
What is coastal abrasion?|Rock fragments carried by waves strike and wear away the coast.|Coasts option
What is attrition of coastal sediment?|Fragments collide and become smaller and more rounded.|Coasts option
How does a wave-cut notch lead to cliff collapse?|Undercutting leaves unsupported rock above, which falls and allows the cliff to retreat.|Coasts option
Why can a spit develop a curved end?|Changing wind and wave directions reshape the deposited sediment at its tip.|Coasts option
Why might salt marsh form behind a spit?|Sheltered low-energy water allows fine sediment to accumulate and vegetation to colonise.|Coasts option
Why can beach nourishment require repeated spending?|Waves continue moving replenished sediment, so the added beach can diminish over time.|Coasts option
How does dune fencing support coastal protection?|It traps sand and limits trampling, encouraging dune growth and vegetation recovery.|Coasts option
Why can protecting one coastal section harm another?|Structures can interrupt sediment supply, potentially increasing erosion farther along the coast.|Coasts option
What is river discharge?|The volume of water passing a point per unit time, commonly measured in m³/s.|Rivers option
What is a drainage basin?|The area drained by a river and its tributaries, bounded by a watershed.|Rivers option
What is hydrograph lag time?|The interval between peak rainfall and peak river discharge.|Rivers option
Why can steep slopes produce a short lag time?|Water reaches the channel quickly through rapid overland flow.|Rivers option
How do interlocking spurs develop in upper river valleys?|A river winds around more resistant projections while mainly eroding vertically, leaving overlapping hillside spurs.|Rivers option
Why is a meander's outside bend usually deeper?|Faster flow erodes the outer bank and channel, while slower inside flow encourages deposition.|Rivers option
Why do floodplains widen over time?|Meander migration and repeated flood deposition reshape and extend the valley floor.|Rivers option
What is a limitation of dredging as flood management?|Channels can refill with sediment, and faster flow may transfer risk downstream rather than eliminate it.|Rivers option
How does glacier abrasion leave striations?|Rock embedded in moving ice scratches parallel marks into underlying bedrock.|Glaciation option
How do ribbon lakes occupy glaciated valleys?|Ice can overdeepen sections of a valley; after retreat the hollows fill with water.|Glaciation option
Why can upland footpath management reduce tourism damage?|Surfacing and route control limit erosion and trampling while retaining access, though they require maintenance.|Glaciation option
`);
})();
