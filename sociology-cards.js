// Original revision questions based on the student's sociology sheets and
// knowledge organisers. Theory claims are attributed, not treated as facts.
(() => {
  'use strict';
  const subject={id:'sociology',name:'AQA Sociology · 8192',decks:[]};
  function add(id,title,paper,source,rows) {
    const cards=rows.trim().split('\n').map((line,i)=>{
      const [question,answer,topic,wrong]=line.split('|');
      const card={id:'soc-'+id+'-'+String(i+1).padStart(3,'0'),question,answer,tags:[topic,paper],sourceNote:source,exam:'Define the concept, apply it to the question and distinguish a theory from evidence. Evaluate competing explanations when asked.'};
      if(wrong) card.quiz={question,options:[answer,...wrong.split('~')]};
      return card;
    });
    subject.decks.push({id:'soc-'+id,title,description:`AQA 8192 · ${paper}. Original recall, application and evaluation cards from your sociology sheets. Historical theories are labelled; undated statistics are not presented as current facts.`,sourceNote:source,cards});
  }
  add('intro','Introduction to Sociology','Cross-paper','Introduction to Sociology knowledge organiser; sociology revision sheets',`
What does sociology study?|Social relationships, institutions and patterns of behaviour, including how society shapes people's opportunities and experiences.|Core concepts|Only the chemical composition of the human body.~Only individual mental processes without social context.~Only the geography of rocks and rivers.
What is a society?|People connected through social relationships, shared institutions and ways of organising life.|Core concepts
What is culture?|A group's shared way of life, including meanings, practices, norms and values.|Culture|An individual's inherited genetic code.~Only the government's written criminal laws.~A ranking of jobs according to income alone.
What is a norm?|An expectation about acceptable behaviour in a particular social setting.|Norms and values|A belief about what is important or desirable.~A position automatically assigned at birth.~An economic system based on private ownership.
What is a value?|A belief about what is important, desirable or morally worthwhile.|Norms and values
How can a value produce a norm?|Valuing respect can produce the expectation that people listen without interrupting.|Application
Why can norms change over time?|People's beliefs, institutions and social circumstances change; accepted behaviour is not fixed forever.|Culture
How can the same behaviour be judged differently across cultures?|Each society may attach different meanings and expectations to it; interpretation depends on context.|Culture
What is a subculture?|A group within society with distinctive norms or values; it need not oppose the wider culture.|Culture
What is cultural diversity?|The existence of varied cultures and ways of life within a society.|Culture
What is cultural relativism?|Understanding practices in their cultural context rather than automatically judging them against one's own culture.|Culture
What is ethnocentrism?|Judging other cultures through one's own cultural standards, often treating those standards as superior.|Culture
What is socialisation?|Learning society's norms, values and roles through interaction with other people.|Socialisation|Transmitting only biological traits from parents to children.~Randomly selecting people for a research sample.~Moving a factory to another country.
What is primary socialisation?|Early learning of norms and values, mainly through family and carers.|Socialisation
What is secondary socialisation?|Learning through agencies beyond the family, such as school, peers, work and media.|Socialisation
What is an agency of socialisation?|A group or institution involved in teaching norms, values and expected behaviour.|Socialisation
How can parents teach behaviour without giving an instruction?|Children observe and imitate what carers do, including how they speak and treat others.|Application
How can school socialise a pupil?|Rules, routines and interactions teach expectations such as punctuality and cooperation.|Application
How can a peer group influence behaviour?|Approval, belonging and fear of exclusion can encourage someone to follow group norms.|Application
How can the media act as an agency of socialisation?|Repeated representations offer models of identity and behaviour; audiences can interpret or reject them.|Application
How does work provide secondary socialisation?|Employees learn occupational standards, workplace routines and expectations through colleagues and management.|Application
What is a sanction?|A response that rewards conformity or discourages behaviour judged unacceptable.|Social control
What is a positive sanction?|A reward for approved behaviour, such as praise or a certificate.|Social control
What is a negative sanction?|A punishment or disapproval for behaviour judged unacceptable, such as a warning.|Social control
How do formal and informal sanctions differ?|Formal sanctions follow official rules; informal sanctions arise from everyday approval or disapproval.|Social control
What is a social role?|Expected behaviour linked to a social position, such as teacher, student or parent.|Roles and status
What is role conflict?|Clashing expectations between roles, such as an employee's working hours and a parent's caring responsibilities.|Roles and status
What is social status?|A person's position in society, which can carry expectations, respect or prestige.|Roles and status
What is ascribed status?|A position assigned without being earned, for example being born into a royal family.|Roles and status|A position gained through qualifications or performance.~A sample selected by drawing names randomly.~The number of people answering a survey.
What is achieved status?|A position gained through actions or accomplishments, such as earning a qualification.|Roles and status
How can status influence treatment?|People may give greater respect or authority to those occupying highly valued positions.|Application
What is the nature side of the nature–nurture debate?|It emphasises biological inheritance as an influence on behaviour.|Nature and nurture
What is the nurture side of the nature–nurture debate?|It emphasises learned behaviour and social experience as influences on development.|Nature and nurture
Why is the nature–nurture debate not a simple either-or choice?|Biological characteristics and social experiences can interact; one does not automatically exclude the other.|Evaluation
Why must evidence about socially isolated children be treated carefully?|Individual cases involve many conditions, so they cannot isolate socialisation as the only cause of an outcome.|Evaluation
What is a gender role?|Social expectations about behaviour associated with gender; these can vary across time and societies.|Gender socialisation
What does canalisation mean in gender socialisation?|Directing children's interests towards gender-associated activities, for example through different toys.|Gender socialisation
What does manipulation mean in gender socialisation?|Encouraging different behaviour or presentation according to gender, such as different expectations about appearance.|Gender socialisation
Why does a stereotype not describe every group member?|It is a simplified generalisation that overlooks individual differences and variation within groups.|Evaluation
How do prejudice and discrimination differ?|Prejudice is an attitude or judgement; discrimination is unequal treatment or action.|Inequality
What is ethnicity?|Identity linked to shared cultural heritage, traditions or ancestry; it is not a measure of biological ability.|Inequality
Why should a racial category not be treated as a hierarchy of human worth?|Racial hierarchies are social beliefs, not evidence that some groups have greater inherent worth or ability.|Evaluation
What is social class?|A grouping associated with economic position, occupation and resources; sociologists define it in different ways.|Inequality
What is a social institution?|An established arrangement organising an important area of life, such as education or family.|Institutions
What is a structural explanation?|An explanation focusing on institutions and social arrangements that shape people's behaviour and opportunities.|Perspectives
What is functionalism's main emphasis?|How institutions contribute to social order, shared values and the functioning of society.|Perspectives|How all behaviour is determined solely by genes.~How teachers should select a random sample.~How class conflict is the only possible social process.
What is a consensus perspective?|An approach emphasising shared interests and values as foundations of social order.|Perspectives
What is a conflict perspective?|An approach emphasising inequalities and competing interests between social groups.|Perspectives
What is Marxism's central class distinction?|Owners of the means of production and workers who sell their labour have different economic interests.|Perspectives
What does feminism examine?|Gender inequalities and how social arrangements can sustain male dominance.|Perspectives
What is interactionism's main emphasis?|Everyday interaction, shared meanings and the effects of labels on identity and behaviour.|Perspectives
What do New Right approaches commonly emphasise?|Personal responsibility, traditional institutions and concerns about state dependency; these are contested positions.|Perspectives
What is patriarchy?|A pattern of social arrangements in which men hold disproportionate power over women.|Inequality
What is capitalism?|An economic system centred on private ownership of productive resources and production for profit.|Perspectives
What is labelling?|Defining or categorising someone in a way that can influence how others treat them.|Interactionism
How might a negative label affect identity?|Repeated treatment as a failure may influence self-image, though people can resist labels.|Application
Why distinguish a sociological theory from a proven fact?|A theory offers an explanation to test against evidence; it can have limitations and competing interpretations.|Evaluation
How can a pupil show sociological imagination about unemployment?|Connect an individual's experience to wider conditions such as job availability and economic change.|Application
Why compare different sociological perspectives?|They highlight different mechanisms and inequalities; comparison helps evaluate how well each explains the evidence.|Evaluation
What makes an explanation sociological rather than simply an opinion?|It uses clear concepts and reasoned links to social context and evidence, while considering alternative explanations.|Exam practice
`);
  add('methods','Research Methods','Cross-paper','Research Methods knowledge organiser; sociology revision sheets',`
What is a research question?|A clear statement of what an investigation aims to find out.|Planning
What is a hypothesis?|A testable prediction about a relationship or pattern, rather than a question with no predicted answer.|Planning
Why operationalise a concept before researching it?|Specify how an abstract idea will be observed or measured so the research can test it consistently.|Planning
What is primary data?|Information collected first-hand for the researcher's own investigation.|Data types|Information originally collected by another organisation.~Only data expressed as percentages.~Only a published theoretical argument.
What is secondary data?|Information already collected by others, which a researcher uses for a new purpose.|Data types
What is quantitative data?|Numerical information used to measure patterns or compare groups.|Data types|Detailed descriptions expressed entirely in words.~Information that must always be collected covertly.~An ethical agreement to protect respondents.
What is qualitative data?|Detailed non-numerical information about meanings, experiences or processes.|Data types
What are mixed methods?|Using more than one method, often combining numerical patterns with detailed accounts.|Data types
Why might primary data suit a specific question?|The researcher can design questions and measurements directly around the investigation's aims.|Evaluation
What is a limitation of using secondary data?|Its categories, timing or original purpose may not match the new research question.|Evaluation
What is a pilot study?|A small trial used to check research tools and practical arrangements before the main study.|Planning|The final nationwide publication of results.~A survey that must follow respondents for decades.~A rule requiring every study to have 100 participants.
What can a pilot reveal about questionnaire wording?|Participants may misunderstand a term, find a question leading or struggle with the available answers.|Application
What is reliability?|Consistency of measurement, including whether repeating the procedure would produce comparable results under similar conditions.|Research quality
What is validity?|How well a measure or account captures what it claims to study.|Research quality
Can data be reliable but invalid?|Yes. A consistently repeated biased question can measure the wrong thing in a very consistent way.|Evaluation
What is representativeness?|How well a sample reflects relevant characteristics of the target population.|Research quality
What does generalisability mean?|How far findings can reasonably be applied beyond the people or setting actually studied.|Research quality
What is the target population?|The group about which the researcher wants to draw conclusions.|Sampling
What is a sample?|A subset of the target population selected for investigation.|Sampling
What is a sampling frame?|A list or source from which potential participants can be selected.|Sampling
What is simple random sampling?|Selection in which each eligible member of the sampling frame has an equal chance of inclusion.|Sampling|Selecting only whoever happens to be nearby.~Selecting people recommended by the previous participant.~Letting the interviewer choose anyone who seems typical.
What is systematic sampling?|Selecting at a regular interval from a list, usually after a random starting point.|Sampling
What risk can systematic sampling face?|A repeating pattern in the list may coincide with the selection interval and bias the sample.|Evaluation
What is stratified random sampling?|Dividing the population into relevant groups and selecting randomly within them, often proportionately.|Sampling
How does quota sampling differ from stratified random sampling?|Quota sampling sets group totals but normally leaves selection within each group to the researcher rather than random selection.|Sampling
What is opportunity sampling?|Selecting people conveniently available to the researcher.|Sampling
Why can opportunity sampling lack representativeness?|Those nearby or available may differ systematically from people who are absent or harder to reach.|Evaluation
What is snowball sampling?|Existing participants introduce the researcher to further potential participants.|Sampling
When can snowball sampling be useful?|When studying groups that are difficult to access and trust-based introductions help recruit people.|Application
Why can a very large sample still be biased?|Size does not correct exclusion from the sampling frame or a systematically biased selection process.|Evaluation
What is a questionnaire?|A set of written questions used to collect information from respondents.|Questionnaires
What is a closed question?|A question offering fixed answers or categories that can usually be compared easily.|Questionnaires
What is an open question?|A question allowing respondents to answer in their own words.|Questionnaires
Why are closed questions convenient for quantitative comparison?|Fixed categories make answers easier to code, count and compare.|Evaluation
Why can closed questions reduce depth?|Respondents must fit their experiences into available categories, which may not express what they mean.|Evaluation
What is a leading question?|Wording that encourages a particular answer instead of allowing a neutral response.|Questionnaires
How would you improve 'Don't you agree homework is pointless?'?|Use neutral wording, such as asking for the respondent's view of homework with balanced response options.|Application
Why is a low response rate a problem?|Non-respondents may differ from respondents, so the completed answers may give a distorted picture.|Evaluation
What is a structured interview?|An interview using standardised questions and a consistent procedure.|Interviews
What is an unstructured interview?|An interview guided flexibly by the participant's answers rather than a fixed sequence of questions.|Interviews
What is a semi-structured interview?|An interview with prepared topics or questions but flexibility to follow up answers.|Interviews
What is rapport in an interview?|A trusting relationship that can help respondents feel comfortable sharing their experiences.|Interviews
What is interviewer bias?|The interviewer's wording, reactions or characteristics influencing what respondents say.|Research quality
What is social desirability bias?|Giving an answer that seems socially acceptable rather than one that accurately describes beliefs or behaviour.|Research quality
What is participant observation?|Studying a group while taking part in its activities.|Observation
What is non-participant observation?|Observing a group's activities without joining in them.|Observation
How do overt and covert observation differ?|In overt observation participants know about the research; in covert observation they do not.|Observation
What is the observer effect?|People altering their behaviour because they know they are being observed.|Observation
Why is covert observation ethically difficult?|Participants cannot normally give informed consent, and privacy or risk of harm may be compromised.|Ethics
What does 'going native' mean in participant observation?|Becoming so involved with a group that the researcher loses critical distance.|Observation
What is content analysis?|Systematic analysis of communication using defined categories; it can count patterns or interpret meanings.|Methods
How could content analysis study gender in adverts?|Define categories, select adverts systematically and code representations consistently, rather than choosing only striking examples.|Application
What is a longitudinal study?|Research following the same people or units over a period of time.|Time scales
What is a cross-sectional study?|Research comparing people or groups at one point in time.|Time scales
What is attrition in a longitudinal study?|Participants dropping out over time, which can reduce the sample or make it less representative.|Evaluation
What is informed consent?|Agreement to participate based on understanding the research and its relevant implications.|Ethics
How do anonymity and confidentiality differ?|Anonymity means identities are not known or identifiable; confidentiality protects information entrusted to the researcher.|Ethics
Why should participants have a right to withdraw?|Participation should be voluntary, including the ability to stop without pressure or unfair consequences.|Ethics
Why does a correlation not prove causation?|Other factors or reverse causation could explain the association; a relationship alone does not establish the mechanism.|Research quality
How should you evaluate a method for a named research problem?|Connect its strengths and limits to access, participants, data needed, practical constraints and ethics in that specific setting.|Exam practice
`);
  add('families','Families','Paper 1','Families knowledge organiser; sociology revision sheets',`
What is a nuclear family?|A family unit of parents and their dependent children; it is one family form, not a definition of all families.|Family forms|A household containing three generations.~Every person sharing the same postcode.~A group containing only unrelated adults.
What is an extended family?|A family including relatives beyond parents and children, such as grandparents, aunts or uncles.|Family forms
What is a lone-parent family?|One parent living with and caring for dependent children.|Family forms
What is a reconstituted family?|A family formed when partners bring children from previous relationships into a new family unit.|Family forms
How does a household differ from a family?|A household shares living accommodation; its members need not be related. Family relationships can extend across households.|Core concepts
What is cohabitation?|Partners living together in a relationship without being married to each other.|Relationships
What is family diversity?|Variation in family forms, relationships, roles and experiences rather than one universal pattern.|Diversity
What is monogamy?|Having one spouse or partner at a time, depending on the relationship being discussed.|Relationships
What is serial monogamy?|Having a succession of exclusive partnerships, rather than several spouses simultaneously.|Relationships
What is polygamy?|Marriage involving more than one spouse at the same time; it differs from serial monogamy.|Relationships
What are conjugal roles?|The roles and responsibilities of partners within marriage or a similar partnership.|Roles
What are segregated conjugal roles?|Partners having largely separate responsibilities and activities, traditionally male breadwinning and female domestic work.|Roles|Partners sharing household responsibilities equally.~Children deciding every household rule.~All relatives living in the same building.
What are joint conjugal roles?|Partners sharing tasks and activities rather than having a sharply divided domestic arrangement.|Roles
What is domestic division of labour?|How unpaid household work and care are allocated among family members.|Roles
What is a dual-earner family?|A family in which both partners earn income through paid employment.|Roles
Why does dual earning not necessarily mean domestic equality?|Paid employment may change while one partner still does most housework, childcare or planning.|Evaluation
What is the dual burden?|Combining paid employment with substantial unpaid domestic responsibilities.|Gender
What is the triple shift?|Paid work, domestic work and emotional work performed together, often used to analyse women's responsibilities.|Gender
What is emotional work in families?|Managing feelings and relationships, such as comforting relatives and maintaining family harmony.|Gender
What is patriarchy in family analysis?|A pattern of male power and advantage affecting decisions, resources or roles; its extent must be investigated.|Gender
What did Parsons mean by instrumental and expressive roles?|He associated male breadwinning with instrumental roles and female emotional care with expressive roles. This is his theory, not a natural requirement.|Parsons
Which two family functions did Parsons emphasise?|Primary socialisation of children and stabilisation of adult personalities.|Parsons|Producing court verdicts and enforcing prison sentences.~Issuing money and setting national interest rates.~Conducting elections and controlling imports.
What is stabilisation of adult personalities?|Parsons's idea that family relationships provide emotional support that helps adults cope with social pressures.|Parsons
How can Parsons's gender-role argument be criticised?|It can justify unequal roles, overlook diverse families and assume women are naturally best suited to domestic work.|Evaluation
Why do functionalists describe the family as socially useful?|They argue family functions help meet individual needs and maintain wider social order.|Functionalism
How might a Marxist explain the family's role in capitalism?|Families can support the workforce and pass on property and class advantage, helping reproduce inequality.|Marxism
What is Zaretsky's argument about family life?|He argued the family appears to offer private refuge but also supports capitalism and cannot fully satisfy people's needs within it.|Zaretsky
Why might family consumption interest Marxists?|Households buy goods and services, providing markets and profits within capitalist economies.|Marxism
How could inheritance reproduce class inequality?|Wealth and property can pass between generations, giving some children advantages others do not inherit.|Application
What is a feminist criticism of harmonious family descriptions?|They may conceal unequal power, unpaid work or abuse rather than showing everyone's experience.|Feminism
What did Delphy and Leonard argue about domestic work?|They argued husbands benefit from women's unpaid work and that the family can operate as a patriarchal institution.|Delphy and Leonard
What did Oakley's housework research challenge?|The assumption that being a housewife is naturally satisfying; it highlighted work experiences such as monotony and isolation.|Oakley
Why should an Oakley study card mention its context?|Findings from a particular historical sample cannot automatically describe all women or present-day households.|Evaluation
What is Young and Willmott's symmetrical family?|Their idea of increasing similarity in partners' roles and greater shared home-centred life, rather than completely interchangeable tasks.|Young and Willmott
Why is symmetry different from complete equality?|Partners can share some activities while time, authority and domestic responsibilities remain unequal.|Evaluation
How did Oakley criticise claims of family symmetry?|Occasional male assistance does not demonstrate an equal domestic workload; the amount and type of work matter.|Comparison
Which five forms of diversity did the Rapoports identify?|Organisational, cultural, social-class, life-course and cohort diversity.|Rapoports|Only income, height, blood group, eye colour and age.~Only marriage, divorce, weddings, funerals and birthdays.~Only legal, criminal, judicial, prison and police diversity.
What is organisational family diversity?|Variation in family organisation, including household form and the allocation of roles.|Rapoports
What is cultural family diversity?|Variation associated with cultural, religious or ethnic traditions, without assuming every group member lives identically.|Rapoports
What is social-class family diversity?|Differences in resources and family experiences connected with class circumstances.|Rapoports
What is life-course diversity?|Family arrangements changing as people move through life stages, such as leaving home or becoming parents.|Rapoports
What is cohort diversity?|Different generations having different family experiences because they grew up in different historical circumstances.|Rapoports
How can changing attitudes affect cohabitation?|Greater acceptance can make unmarried partnerships a more socially acceptable choice.|Social change
How might women's employment affect relationships?|Independent income can increase choice and bargaining power, although employment alone does not guarantee equality.|Social change
Why is divorce not explained by one cause alone?|Legal access, changing expectations, reduced stigma and economic circumstances can interact.|Divorce
How do divorce and separation differ?|Divorce legally ends a marriage; separation means partners live apart without necessarily ending it legally.|Relationships
Why can rising divorce figures be difficult to interpret?|They can reflect changing legal access and willingness to leave unhappy marriages, not simply weaker personal commitment.|Evaluation
What does secularisation mean in family debates?|A decline in religious influence that may reduce religious pressure to marry or remain married.|Social change
How can expectations of marriage affect divorce?|If people expect emotional fulfilment and equality, dissatisfaction may make them more willing to leave.|Application
What is a New Right criticism of family diversity?|Some New Right writers favour a conventional two-parent family and argue other arrangements weaken socialisation; this is contested.|New Right
How can New Right explanations be evaluated?|They may idealise traditional families and overlook poverty, support networks and positive experiences in diverse households.|Evaluation
Why should lone-parent families not automatically be blamed for disadvantage?|Income, housing, discrimination and access to support may explain outcomes better than family form alone.|Application
How can extended kin help family members?|Relatives can provide childcare, practical help, emotional support or financial assistance across households.|Application
What is child-centred family life?|Family decisions and resources being strongly directed towards children's needs and development.|Childhood
Why do sociologists describe childhood as socially constructed?|Its expected roles, treatment and boundaries vary across societies and historical periods.|Childhood
How can unequal decision-making be investigated?|Compare who controls money, makes major choices and can veto decisions; income alone may miss power differences.|Research application
Why might interviews about housework produce biased answers?|People may exaggerate their contribution or report socially acceptable arrangements rather than actual work.|Methods application
What would time-use diaries add to a family study?|Recorded activities can help compare workloads more systematically, though reporting and task definitions still matter.|Methods application
How should a family example support an exam argument?|Explain the mechanism connecting it to the question rather than merely listing a family type or theorist.|Exam practice
How can you compare Marxist and feminist family explanations?|Marxists emphasise class and capitalism; feminists emphasise gender power. The explanations can overlap but are not identical.|Comparison
`);
  add('education','Education','Paper 1','Education knowledge organiser; sociology revision sheets',`
What are the two broad functions of education often distinguished?|Teaching knowledge and skills, and socialising people into norms and values.|Functions|Producing only inherited biological traits.~Replacing every function of the family.~Ensuring every pupil receives the same income.
What is formal education?|Organised teaching through institutions such as schools and colleges.|Core concepts
What is informal education?|Learning outside formal lessons, including everyday experience and interaction.|Core concepts
What is the formal curriculum?|The officially specified subjects, knowledge and learning activities taught by a school.|Curriculum
What is the hidden curriculum?|Lessons about behaviour, values and authority learned through school routines rather than the stated syllabus.|Curriculum|The published list of examination topics.~Only lessons taught by absent teachers.~A pupil's genetic ability to remember facts.
How can punctuality illustrate the hidden curriculum?|School routines reward being on time, teaching habits that may also be expected in workplaces.|Application
What did Durkheim mean by social solidarity?|A sense of shared belonging and commitment that education can help develop.|Durkheim
How did Durkheim link education to specialist skills?|He argued complex societies need education to prepare people for specialised roles in the division of labour.|Durkheim
What are particularistic standards?|Judgements based on a person's specific relationship or circumstances, such as their position within a family.|Parsons
What are universalistic standards?|Standards applied to everyone in a setting, such as common examination criteria.|Parsons
How did Parsons describe the school-family relationship?|School acts as a bridge from family particularism towards wider society's universalistic standards.|Parsons
What is meritocracy?|A system in which achievement and reward are based on ability and effort rather than inherited privilege.|Meritocracy
Why is school meritocracy a claim to evaluate?|Equal examination rules do not remove unequal resources, discrimination or different opportunities to prepare.|Evaluation
What is role allocation in functionalist education theory?|Education helps sort people into future social and occupational roles through assessment and qualifications.|Functionalism
What is Bowles and Gintis's correspondence principle?|School relationships and rewards mirror those of capitalist workplaces, preparing pupils for a hierarchical labour system.|Bowles and Gintis|Schools abolish every workplace hierarchy.~Qualifications always measure biological inheritance.~All pupils communicate only through letters.
How might rewards support the correspondence principle?|External rewards for completing tasks can resemble workplace pay and promotion rather than learning for its own sake.|Application
What is a Marxist criticism of educational meritocracy?|It can legitimise class inequality by presenting unequal outcomes as the result of individual effort alone.|Marxism
What did Willis study in Learning to Labour?|A small group of working-class boys whose anti-school culture contributed to their movement into manual work.|Willis
Why are Willis's lads not simply obedient pupils?|They resisted school authority, yet their resistance still helped reproduce a working-class occupational destination.|Willis
What limits generalising Willis's findings?|A small, historically specific group of boys cannot represent every working-class pupil, gender or school.|Evaluation
What is material deprivation in education?|Lack of resources such as suitable housing, study space, transport or equipment that can obstruct learning.|Class inequality
How could overcrowding affect study?|Noise, interruptions and limited space can make concentration and homework difficult.|Application
What is cultural capital?|Knowledge, dispositions and cultural resources that can be valued and rewarded by educational institutions.|Class inequality
How can parental knowledge of school systems matter?|Understanding admissions, appeals or qualifications may help families obtain opportunities and support.|Application
Why should restricted language codes not be called unintelligent?|They are context-dependent communication styles, not a measure of intelligence; schools may reward more explicit elaborated language.|Language
How can income affect school choice?|Transport, housing near a school and access to information can make nominal choice easier for some families.|Marketisation
What is Halsey, Heath and Ridge's central educational concern?|How social-class background relates to educational opportunity and attainment.|Halsey
Why does a male-only historical sample limit Halsey's study?|It cannot directly establish women's experiences or automatically describe current education.|Evaluation
What is streaming?|Grouping pupils by perceived general ability across several or all subjects.|Grouping
What is setting?|Grouping pupils by perceived ability in a particular subject.|Grouping
What is mixed-ability teaching?|Teaching pupils with varied attainment or perceived ability together rather than separating them into attainment groups.|Grouping
How did Ball's Beachside research examine grouping?|He studied how school organisation and ability grouping shaped pupils' experiences, labels and attitudes.|Ball
Why can labels remain after formal streaming ends?|Teachers' expectations and peer reputations can persist even when the organisational arrangement changes.|Ball
What is teacher labelling?|Assigning categories or expectations to pupils, such as treating someone as hardworking or troublesome.|Interactionism
What is a self-fulfilling prophecy?|An expectation influences treatment and behaviour so that the expected outcome becomes more likely.|Interactionism|A prediction that cannot affect behaviour.~An examination score fixed before birth.~A conclusion drawn without any social interaction.
Why is a label not guaranteed to become a prophecy?|Pupils can reject labels, obtain other support or respond in different ways.|Evaluation
What is a pro-school subculture?|A pupil group that values school success and tends to support school norms.|Subcultures
What is an anti-school subculture?|A pupil group that gains status through resistance to school expectations; members need not all behave identically.|Subcultures
How could setting contribute to pupil polarisation?|Unequal expectations and status may encourage some pupils to identify with school and others to oppose it.|Application
What is marketisation of education?|Introducing competition and consumer-style choice into education.|Marketisation
What does parentocracy claim?|That educational outcomes increasingly reflect parents' choices and resources rather than pupils' ability alone.|Marketisation
What did Ball, Bowe and Gewirtz examine about choice?|How families' differing resources affect their ability to act as educational consumers.|Marketisation
Why can published school results influence behaviour?|Schools and parents may respond to performance comparisons, affecting admissions choices and institutional priorities.|Application
What is selection in education?|Allocating school places using criteria such as attainment or aptitude, depending on the system.|School types
How does a comprehensive school differ from a selective school?|A comprehensive school does not select its general intake by academic ability, unlike an academically selective school.|School types
Why might private schooling reproduce class advantage?|Fees and additional resources can provide opportunities not equally available to all families.|Class inequality
What is gender stereotyping in education?|Expectations about suitable subjects or behaviour based on gender rather than the individual pupil.|Gender
How can subject choice differ from overall attainment?|Groups can achieve strong results overall while still choosing different subjects and career pathways.|Gender
How might role models affect aspirations?|Seeing people like oneself in a subject or occupation can challenge stereotypes and expand perceived possibilities.|Application
Why should ethnic differences in results not be treated as biological?|Social circumstances, school treatment and diverse experiences provide sociological explanations; broad group averages conceal variation.|Ethnicity
What is institutional racism in education?|Organisational practices that produce racial disadvantage, including effects that do not rely on openly prejudiced individuals.|Ethnicity
How can an ethnocentric curriculum affect pupils?|Focusing mainly on one cultural perspective may marginalise other experiences or imply they are less valuable.|Ethnicity
Why do class, ethnicity and gender need to be considered together?|Their effects can interact, so one category alone may obscure differences within groups.|Evaluation
What is the difference between attainment and achievement?|Attainment usually refers to measured outcomes such as grades; achievement can mean progress relative to a starting point.|Measurement
How can official education statistics help research?|They allow comparisons across large populations, but definitions, missing groups and context need examination.|Methods application
What can classroom observation reveal that grades cannot?|Interactions, informal expectations and daily routines that may help explain how outcomes arise.|Methods application
Why might observing a classroom change its behaviour?|Teachers and pupils may act differently when they know they are being watched.|Methods application
How can you compare functionalist and Marxist views of schools?|Functionalists emphasise integration and role preparation; Marxists question whose interests the hierarchy and curriculum serve.|Comparison
How should a labelling exam answer explain causation?|Trace the label through changed treatment, pupil response and possible outcome; do not merely name the concept.|Exam practice
What makes an evaluation of an educational theory convincing?|Use relevant evidence and explain both what the theory accounts for and what it overlooks.|Exam practice
`);
  add('crime','Crime and Deviance','Paper 2','Crime and Deviance knowledge organiser; sociology revision sheets',`
How do crime and deviance differ?|Crime breaks criminal law; deviance breaks social norms and may be legal.|Core concepts|All deviance is automatically criminal.~Crime means any unpopular opinion.~Deviance means only behaviour recorded by police.
Why is deviance socially relative?|Judgements depend on social setting, audience, time and cultural expectations.|Core concepts
Can an action be criminal without being widely condemned?|Yes. Laws and public attitudes may differ, so legal and social reactions need not match.|Application
What is formal social control?|Control through officially recognised institutions and rules, such as policing and courts.|Social control
What is informal social control?|Everyday responses such as approval, ridicule or disapproval that encourage conformity.|Social control
What is the police's role in social control?|Investigating offences and enforcing the law, with discretion influencing which incidents receive attention.|Institutions
What does the judiciary do?|Courts interpret and apply law in cases. Parliament's law-making role should not be confused with judging cases.|Institutions
Why is imprisonment not the only response to crime?|Sentencing can involve other measures, depending on the offence and legal system; sociologists compare their purposes and effects.|Institutions
What is deterrence?|Discouraging offending through anticipated consequences or punishment.|Punishment
What is rehabilitation?|Helping offenders change behaviour and reintegrate into society.|Punishment
What is incapacitation?|Restricting an offender's ability to offend, for example through imprisonment.|Punishment
What is retribution?|Punishment justified as a deserved response to wrongdoing.|Punishment
Why might prison have contradictory effects?|It can protect the public while also disrupting relationships or exposing people to criminal networks.|Evaluation
What is recidivism?|Returning to offending after a previous offence or sanction; measured rates depend on the definition used.|Punishment
How can functionalists explain some social functions of crime?|Reactions to crime can reinforce boundaries and shared values, even though crime can also cause serious harm.|Functionalism
What is anomie?|A condition of weakened or disrupted normative regulation, associated with uncertainty about acceptable behaviour.|Functionalism
What is Merton's strain theory?|Pressure arises when people accept socially valued goals but lack legitimate means of reaching them.|Merton|All crime is caused by a single criminal gene.~Only the victim decides which laws exist.~Everyone has equal access to legitimate opportunities.
What is conformity in Merton's typology?|Accepting both cultural goals and legitimate means.|Merton
What is innovation in Merton's typology?|Accepting cultural goals while using illegitimate means to pursue them.|Merton
What is ritualism in Merton's typology?|Continuing approved routines while reducing or abandoning commitment to the wider success goals.|Merton
What is retreatism in Merton's typology?|Rejecting both established goals and their approved means.|Merton
What is rebellion in Merton's typology?|Seeking to replace established goals and means with alternatives.|Merton
How can strain theory be evaluated?|It explains some opportunity-related offending but does not account equally well for every crime, motive or social reaction.|Evaluation
What did Albert Cohen mean by status frustration?|Frustration when working-class boys were judged against middle-class standards and could not gain valued status.|Albert Cohen
How does a delinquent subculture respond to status frustration?|It can provide alternative status by rewarding behaviour the wider institution condemns.|Albert Cohen
Why must Albert Cohen and Stanley Cohen be distinguished?|Albert Cohen explains delinquent subcultures; Stanley Cohen is associated with moral panics and folk devils.|Theorists
What is a moral panic?|A heightened reaction to a perceived threat to social values, whose scale may be disproportionate to the evidence.|Stanley Cohen
What is a folk devil?|A person or group presented as a symbolic threat during a moral panic.|Stanley Cohen
How can media reporting amplify deviance?|Publicity and stereotyping may intensify reactions, identity and policing, contributing to further recorded deviance.|Media
Why does reporting more incidents not prove more actual crime?|Coverage may reflect editorial choices, visibility or reporting practices rather than incidence alone.|Evaluation
What did Becker mean by labelling deviance?|Deviance results partly from social rules and their application, not just an inherent quality of an act.|Becker|Every society always judges every action identically.~Only a person's height determines deviance.~Police statistics measure every offence perfectly.
What is a deviant career in labelling theory?|A sequence in which reactions and exclusion can encourage identification with a deviant role.|Becker
How can labelling theory be criticised?|It can under-explain the original behaviour and does not mean everyone accepts a label.|Evaluation
What is a Marxist explanation of law and crime?|Law and enforcement can reflect unequal class power, with some harmful activities receiving less attention than others.|Marxism
What is white-collar crime?|Crime connected with occupational or professional roles, often committed by people in relatively privileged positions.|Types of crime
What is corporate crime?|Offending by organisations or their representatives in pursuit of organisational interests.|Types of crime
Why may corporate crime be less visible than street crime?|Complex activities, diffuse victims and specialist investigation can make detection and public recognition harder.|Evaluation
What is selective law enforcement?|Some groups or offences receiving more attention or sanction than others, affecting recorded patterns.|Social control
What did Heidensohn emphasise about women's conformity?|Gendered control in the home, public spaces and workplaces can restrict opportunities and behaviour.|Heidensohn
How might fear restrict women's public behaviour?|Concern about harassment or violence can limit movement, creating informal constraints rather than proving women are naturally less deviant.|Application
What are Carlen's class and gender deals?|Expectations of material rewards from legitimate work and relational rewards from conventional family roles.|Carlen
How did Carlen connect failed deals with offending?|Some interviewed women described neither employment nor conventional family roles delivering expected rewards, reducing commitment to conformity.|Carlen
Why should Carlen's findings not describe all women?|Her small qualitative sample of convicted women offers depth, not statistical representation of every woman.|Evaluation
What is the chivalry thesis?|The claim that some criminal justice officials treat women more leniently; evidence varies and requires evaluation.|Gender
What is the double-deviance argument?|Women can be judged for breaking gender expectations as well as criminal rules.|Gender
Why do official crime statistics have a dark figure?|Offences may be unreported, undetected or unrecorded and therefore absent from recorded totals.|Measurement|They include every offence whether discovered or not.~They are entirely unrelated to recording rules.~They measure only the temperature inside prisons.
What is a victimisation survey?|A survey asking people about experiences of crime, including incidents not reported to police.|Measurement
What limits victimisation surveys?|Recall errors, sensitive disclosure and sampling exclusions can leave some experiences unmeasured.|Evaluation
What is a self-report offending study?|Research asking participants to report their own offending, often anonymously.|Measurement
Why might self-report studies miss serious offending?|Participants may conceal sensitive acts, misunderstand questions or not belong to the groups sampled.|Evaluation
How can changing recording rules affect crime trends?|More incidents may be classified or recorded as offences even without an equivalent change in actual behaviour.|Measurement
Why are recorded age patterns not a complete explanation?|They show a pattern but not the motives, opportunities or enforcement practices causing it.|Evaluation
How could opportunity affect offending?|Access to targets, resources and supervision changes what crimes people can commit.|Application
Why must ethnicity and crime statistics be handled carefully?|Recorded differences may reflect disadvantage, policing and reporting, not an inherent criminal trait.|Ethnicity
What is stereotyping in a crime context?|Applying a generalised image to a group rather than investigating individuals and evidence.|Social reaction
How could poverty link to some offending without determining it?|Restricted legitimate opportunities can create pressure, but most disadvantaged people do not offend and many offenders are affluent.|Application
Why can crimes against powerful groups receive more attention?|Resources and influence can shape which harms become publicly visible and strongly sanctioned.|Power
How do interactionist and structural crime explanations differ?|Interactionists emphasise meaning and reactions; structural approaches emphasise wider inequalities, norms or opportunities.|Comparison
How should you use a crime statistic in an exam?|Identify what was measured, its source and context, then explain what it can and cannot establish.|Exam practice
What makes a crime theory evaluation balanced?|Explain a relevant mechanism and evidence, then identify limits rather than claiming one theory explains every offence.|Exam practice
`);
  add('stratification','Social Stratification','Paper 2','Social Stratification knowledge organiser; sociology revision sheets',`
What is social stratification?|The structured ranking of social groups with unequal access to valued resources and opportunities.|Core concepts|Random differences in favourite colours.~The chemical layers inside a cell.~A system in which every person has identical power.
How does inequality differ from difference?|Difference is variation; inequality involves unequal resources, opportunities or treatment.|Core concepts
What is social class?|A grouping related to economic position, occupation and resources, with definitions varying between theories.|Class
How do income and wealth differ?|Income is a flow of money over time; wealth is accumulated assets after liabilities are considered.|Resources
What are life chances?|Opportunities to obtain valued outcomes such as health, education, housing and security.|Weber
What is social mobility?|Movement between positions in a stratification system.|Mobility
What is upward mobility?|Moving to a higher social or occupational position.|Mobility
What is downward mobility?|Moving to a lower social or occupational position.|Mobility
How do intergenerational and intragenerational mobility differ?|Intergenerational mobility compares generations; intragenerational mobility concerns change within a person's lifetime.|Mobility|Both refer only to geographical migration.~Intergenerational mobility means changing jobs every day.~Intragenerational mobility compares only grandparents with grandchildren.
Why is a meritocratic society not simply an unequal society?|Meritocracy claims positions reflect ability and effort; inequality alone does not establish how positions were obtained.|Meritocracy
What distinguishes an ascribed status from an achieved status?|Ascribed status is assigned without personal achievement; achieved status is obtained through actions or accomplishments.|Status
Why can inherited resources restrict meritocracy?|Wealth, networks and educational opportunities can advantage people independently of effort or ability.|Evaluation
How did Marx define the bourgeoisie?|The class owning the means of production in capitalism.|Marx
How did Marx define the proletariat?|Workers who sell their labour because they do not own the productive resources needed to support themselves.|Marx
What are the means of production?|Resources used to produce goods and services, such as factories, equipment and land.|Marx
What is exploitation in Marx's class explanation?|Owners gain from the value created by workers' labour, producing an unequal relationship.|Marx
What is class consciousness?|Awareness of shared class interests and position, potentially enabling collective action.|Marx
What is false consciousness in Marxist analysis?|Understanding that obscures class interests or treats exploitative relationships as natural or inevitable.|Marx
Why might Marx's two-class model be criticised?|Modern occupational differences and non-class inequalities complicate a simple division between owners and workers.|Evaluation
What three dimensions of stratification did Weber distinguish?|Class, status and party: economic position, social esteem and organised influence.|Weber|Only age, height and eye colour.~Only income, temperature and rainfall.~Only employers, employees and tourists.
What is market situation in Weber's class analysis?|The economic opportunities linked to assets, skills and ability to obtain income in markets.|Weber
What is status in Weber's theory?|Social honour or prestige, which need not correspond exactly to wealth.|Weber
What did Weber mean by party?|An organised group seeking influence or power, not only a social celebration or necessarily an electoral party.|Weber
How can status and wealth differ?|A respected occupation may not be highly paid, while a wealthy person may lack social esteem.|Application
How does Weber's account broaden Marx's explanation?|It includes prestige and organised power alongside economic class and recognises more varied market positions.|Comparison
What did Davis and Moore argue about inequality?|Unequal rewards help attract and motivate qualified people to socially important roles.|Davis and Moore
What is a criticism of Davis and Moore's importance argument?|It is difficult to measure a role's importance independently of its rewards; valuable work may be poorly paid.|Evaluation
How can unequal education challenge Davis and Moore?|If talented people cannot access training, rewards do not necessarily select the most capable candidates.|Evaluation
What is embourgeoisement?|The claim that affluent workers increasingly adopt middle-class lifestyles, values or identities.|Class change
What did Devine investigate about affluent workers?|Whether relatively well-paid manual workers had become middle-class in outlook, revisiting the debate through interviews in Luton.|Devine
Why is Devine's study not a panel of the original affluent workers?|It used a later sample in the same locality, not repeated interviews with all the identical original respondents.|Methods
How can consumption fail to demonstrate class identity?|Buying similar goods does not necessarily change work relationships, social networks or political attitudes.|Evaluation
What is absolute poverty?|Insufficient resources to meet a defined minimum of basic needs.|Poverty
What is relative poverty?|Insufficient resources compared with normal living standards and participation in a particular society.|Poverty|Only being unable to buy luxury yachts.~A fixed biological condition unrelated to society.~The same monetary threshold everywhere and forever.
Why does a relative poverty threshold depend on context?|Living standards and socially expected participation differ between societies and over time.|Poverty
What did Townsend emphasise about deprivation?|Lacking resources can exclude people from customary activities and living conditions, not only threaten physical survival.|Townsend
What is a deprivation index?|A set of indicators used to measure missing resources or participation; conclusions depend on which indicators are chosen.|Measurement
Why can defining necessities be controversial?|People disagree about which activities and resources are essential rather than optional.|Evaluation
What is a structural explanation of poverty?|Poverty arising from economic arrangements and unequal opportunities, such as insecure employment or housing costs.|Explanations
What is an individual explanation of poverty?|An account emphasising personal behaviour or characteristics; it must be assessed rather than assumed.|Explanations
What did Murray claim about an underclass?|He argued welfare dependency and particular behaviours could reproduce disadvantage. This New Right claim is contested.|Murray
How can Murray's explanation be criticised?|It may blame disadvantaged people and understate insecure work, discrimination and barriers to opportunity.|Evaluation
Why does receiving benefits not prove unwillingness to work?|People may be employed, caring, disabled or facing limited opportunities; receipt alone does not identify motivation.|Application
What is a poverty cycle?|Disadvantages can reinforce one another across time or generations, though the cycle is not inevitable.|Poverty
How could low income affect health?|Poor housing, stress, limited resources and insecure work can create pathways to worse health outcomes.|Life chances
How could housing disadvantage affect education?|Overcrowding, instability or lack of study space can interfere with attendance and learning.|Life chances
Why do average class differences not predict every individual?|Groups contain variation, and individual outcomes also depend on many interacting circumstances.|Evaluation
What is gender stratification?|Unequal opportunities and resources associated with gender within social institutions.|Gender
How does a gender pay gap differ from unequal pay for the same job?|A pay gap compares group earnings; unequal pay concerns differences for equivalent work. One measure does not directly establish the other.|Gender
What is occupational segregation?|Different social groups being concentrated in different occupations or job levels.|Work
What did Walby mean by patriarchy?|A system of social structures and practices through which men dominate or advantage themselves over women.|Walby
Which six structures did Walby identify?|Household production, paid work, the state, male violence, sexuality and cultural institutions.|Walby|Only rainfall, rivers, coasts, tectonics, deserts and glaciers.~Only genetics, blood groups, nerves, muscles, bones and lungs.~Only income tax, sales tax, import tax, road tax, fees and fines.
How do private and public patriarchy differ?|Private patriarchy centres on household control; public patriarchy involves disadvantage across institutions beyond the home.|Walby
How could ethnicity influence life chances?|Discrimination and unequal access to employment, housing or services can shape opportunities without implying biological inferiority.|Ethnicity
What is institutional discrimination?|Organisational practices that disadvantage a group, including routines not openly intended to discriminate.|Inequality
How can age shape social status?|Age-related expectations and access rules can affect authority, employment and treatment.|Age
Why do disability and disadvantage need a social explanation?|Barriers in environments, institutions and attitudes can restrict opportunities beyond an individual's impairment.|Disability
How can power operate without physical force?|Control over decisions, resources, agendas or accepted ideas can influence others' choices.|Power
Why should older poverty studies be dated in an answer?|Their findings describe a historical context, not automatically present-day poverty levels.|Evidence
How do you evaluate an explanation of inequality?|Compare its mechanism with relevant evidence and consider class, gender, ethnicity and other interacting factors.|Exam practice
`);
  // One cross-paper deck covers every named Appendix B text, including co-authors.
  // Explanations develop the student's supplied notes; see SOCIOLOGISTS-SOURCES.md.
  const studies=[
    {id:'delphy-leonard',label:'Delphy and Leonard',names:['Christine Delphy','Diana Leonard'],topic:'Families',work:'Familiar Exploitation (1992)',perspective:'Feminism',
      idea:'Key phrase: domestic exploitation. Men benefit from women’s unpaid housework and care, even when women also have paid jobs.',
      key:'Men benefit from women’s unpaid labour within the family',
      evaluation:'Households vary. Compare their unequal-workload argument with Young and Willmott’s more optimistic account of shared conjugal roles.',
      exam:'Link an unequal domestic workload to male power; compare symmetrical families.'},
    {id:'oakley',label:'Oakley',names:['Ann Oakley'],topic:'Families',work:'Conventional families (1982)',perspective:'Feminism',
      idea:'Key phrase: conventional family ideal. Treating the married, nuclear family as normal can pressure people into gendered roles and devalue other families.',
      key:'The conventional nuclear-family ideal can pressure people into unequal roles',
      evaluation:'A social ideal is not every family’s reality. Use family diversity to assess its influence, and date this 1982 account.',
      exam:'Challenge one normal-family assumption; do not confuse this text with her housework research.'},
    {id:'parsons-family',label:'Parsons',names:['Talcott Parsons'],topic:'Families',work:'The social structure of the family (1959)',perspective:'Functionalism',
      idea:'Key phrases: primary socialisation and stabilisation of adult personalities. Families teach children norms and values and provide adults with emotional support.',
      key:'Families provide primary socialisation and emotional support for adults',
      evaluation:'This positive view can overlook abuse and unequal domestic work. Feminists question whether the family benefits everyone equally.',
      exam:'Explain how one family activity performs a function, then assess who benefits.'},
    {id:'rapoports',label:'Rapoport and Rapoport',names:['Robert Rapoport','Rhona Rapoport'],topic:'Families',work:'British families in transition (1982)',perspective:'Family diversity',
      idea:'Key phrase: five dimensions of family diversity. Organisational, cultural, social-class, life-course and cohort differences explain why families vary beyond household shape.',
      key:'Family diversity has organisational, cultural, class, life-course and cohort dimensions',
      evaluation:'The dimensions can overlap: one family may show cultural, class and life-course differences. Historical examples also need updating.',
      exam:'Match the example to a dimension: retirement changes suggest life-course diversity.'},
    {id:'young-willmott',label:'Young and Willmott',names:['Michael Young','Peter Willmott'],topic:'Families',work:'The Symmetrical Family (1973)',perspective:'Functionalism',
      idea:'Key phrase: symmetrical family. Their survey suggested more home-centred families with shared conjugal roles. Symmetry means greater similarity, not identical tasks.',
      key:'Conjugal roles were becoming more shared in home-centred families',
      evaluation:'Occasional help does not prove equality. Feminists compare time, planning and responsibility, not simply whether men do any housework.',
      exam:'Define symmetry, then assess the amount and responsibility of each partner’s work.'},
    {id:'zaretsky',label:'Zaretsky',names:['Eli Zaretsky'],topic:'Families',work:'Capitalism, the Family and Personal Life (1976)',perspective:'Marxism',
      idea:'Key phrase: family and capitalism. Families offer an apparent private refuge while unpaid care sustains workers and household consumption supports capitalism.',
      key:'The family cushions capitalism’s pressures while helping reproduce the system',
      evaluation:'An economic focus can understate affection and household differences. Feminists also ask how men benefit, not only capitalism.',
      exam:'Link unpaid care or consumption to capitalism; assess whether affection is overlooked.'},
    {id:'ball',label:'Ball',names:['Stephen Ball'],topic:'Education',work:'Beachside Comprehensive (1981)',perspective:'School processes',
      idea:'Key phrase: banding and pupil identities. His Beachside school case study showed how grouping and teacher expectations could reinforce divisions between pupils.',
      key:'Ability grouping and school interactions can reinforce divisions between pupils',
      evaluation:'Participant observation provides depth, but one school may not represent others. The researcher’s presence and interpretation can affect findings.',
      exam:'Explain the chain: grouping → teacher expectations → pupil responses.'},
    {id:'ball-bowe-gewirtz',label:'Ball, Bowe and Gewirtz',names:['Stephen Ball','Richard Bowe','Sharon Gewirtz'],topic:'Education',work:'Market forces and parental choice (1994)',perspective:'Marketisation',
      idea:'Key phrase: unequal parental choice. School markets favour families with resources and information; a formal right to choose does not give everyone equal opportunities.',
      key:'Marketisation and unequal resources can make parental choice unequal',
      evaluation:'Choice depends on local schools, admissions and family resources. Findings from one policy period should not automatically describe schools today.',
      exam:'Show how money, transport or information makes school choice unequal.'},
    {id:'bowles-gintis',label:'Bowles and Gintis',names:['Samuel Bowles','Herbert Gintis'],topic:'Education',work:'Schooling in Capitalist America (1976)',perspective:'Marxism',
      idea:'Key phrase: correspondence principle. The hidden curriculum teaches hierarchy and obedience, preparing pupils for capitalist workplaces and helping reproduce class inequality.',
      key:'School relationships reproduce workplace hierarchy and capitalist class inequality',
      evaluation:'Willis’s pupils resisted school values rather than passively accepting them. Schools can also encourage critical thinking and social mobility.',
      exam:'Link school obedience to workplace authority; contrast this with Willis’s resistance.'},
    {id:'durkheim',label:'Durkheim',names:['Émile Durkheim'],topic:'Education',work:'Moral Education (1925)',perspective:'Functionalism',
      idea:'Key phrase: social solidarity. Education transmits shared norms and values, helping pupils cooperate and feel part of wider society.',
      key:'Education transmits shared values and develops social solidarity',
      evaluation:'Marxists ask whose values are taught. Conflict and exclusion challenge the idea that schooling creates unity for everyone.',
      exam:'Explain how shared rules build belonging, then ask whose values they reflect.'},
    {id:'halsey-heath-ridge',label:'Halsey, Heath and Ridge',names:['A. H. Halsey','Anthony Heath','John Ridge'],topic:'Education',work:'Origins and Destinations (1980)',perspective:'Class inequality',
      idea:'Key phrase: class and educational opportunity. Their survey linked advantaged class backgrounds to greater chances of staying in education and entering university.',
      key:'Social-class background was strongly linked to educational opportunities',
      evaluation:'The large survey supports comparisons, but excluded women. A historical association does not by itself prove a single cause.',
      exam:'Use the class pattern to question meritocracy; mention the male-only sample.'},
    {id:'parsons-school',label:'Parsons',names:['Talcott Parsons'],topic:'Education',work:'The school class as a social system (1961)',perspective:'Functionalism',
      idea:'Key phrase: bridge to wider society. School moves pupils from particularistic family treatment to universalistic rules, rewarding achievement and allocating roles on merit.',
      key:'School bridges family and society through achievement and universalistic standards',
      evaluation:'Unequal resources can undermine meritocracy. Marxists argue that rewarded achievement may reflect inherited advantage, not simply individual ability.',
      exam:'Explain common school standards, then assess whether everyone can compete equally.'},
    {id:'willis',label:'Willis',names:['Paul Willis'],topic:'Education',work:'Learning to Labour (1977)',perspective:'Marxism and pupil agency',
      idea:'Key phrase: anti-school counterculture. His working-class lads resisted school and qualifications, but this helped lead them into manual work and reproduce class inequality.',
      key:'An anti-school counterculture could reproduce class inequality through active resistance',
      evaluation:'The small group gives detailed insight but cannot represent all pupils. Its male, historical sample limits wider generalisation.',
      exam:'Explain how resistance reproduces class; compare Bowles and Gintis’s obedience argument.'},
    {id:'becker',label:'Becker',names:['Howard Becker'],topic:'Crime and deviance',work:'Outsiders (1963)',perspective:'Interactionism',
      idea:'Key phrase: labelling. Social reactions can make a deviant label a master status; exclusion may then encourage a deviant career or self-fulfilling prophecy.',
      key:'Social reactions and labels can contribute to a deviant career',
      evaluation:'Labelling explains reactions better than the initial offence. People can reject labels, so further deviance is not inevitable.',
      exam:'Trace label → exclusion → possible further deviance; avoid claiming inevitability.'},
    {id:'carlen',label:'Carlen',names:['Pat Carlen'],topic:'Crime and deviance',work:'Women, Crime and Poverty (1988)',perspective:'Feminism and control theory',
      idea:'Key phrases: class deal and gender deal. Interviews with convicted women suggested that failed rewards from work and family can weaken reasons to conform.',
      key:'Failed class and gender deals can weaken women’s reasons to conform',
      evaluation:'In-depth interviews reveal experiences, but a small convicted sample cannot represent all women. Recollections may also be selective.',
      exam:'Explain a failed deal and weakened conformity; poverty does not inevitably cause crime.'},
    {id:'cohen',label:'Albert Cohen',names:['Albert Cohen'],topic:'Crime and deviance',work:'Delinquent Boys (1955)',perspective:'Functionalism and subculture',
      idea:'Key phrase: status frustration. Boys denied conventional success may gain peer status through a delinquent subculture that rewards behaviour rejected by school.',
      key:'Status frustration can lead boys to seek recognition in a delinquent subculture',
      evaluation:'It helps explain non-financial group offending, but focuses on boys and assumes shared goals. Other crimes need different explanations.',
      exam:'Link blocked status to peer rewards; Albert Cohen is not Stanley Cohen.'},
    {id:'heidensohn',label:'Heidensohn',names:['Frances Heidensohn'],topic:'Crime and deviance',work:'Women and Crime (1985)',perspective:'Feminism and control theory',
      idea:'Key phrase: patriarchal control. Controls at home, in public and at work restrict women’s opportunities to offend, helping explain lower recorded female crime.',
      key:'Patriarchal controls at home, in public and at work restrict opportunities for crime',
      evaluation:'Women’s experiences differ. Recorded crime also depends on policing and reporting, not only controls or actual offending.',
      exam:'Explain a specific control and restricted opportunity; compare Carlen’s failed deals.'},
    {id:'merton',label:'Merton',names:['Robert K. Merton'],topic:'Crime and deviance',work:'Social Theory and Social Structure (1968 edition)',perspective:'Functionalism and strain',
      idea:'Key phrase: strain theory. Shared success goals clash with unequal legitimate opportunities. Responses include conformity, innovation, ritualism, retreatism and rebellion.',
      key:'Strain arises between shared success goals and unequal legitimate opportunities',
      evaluation:'Blocked opportunities do not make everyone offend. The theory can neglect powerful offenders and assumes widely shared success goals.',
      exam:'Name the goal, blocked means and response: fraud for wealth illustrates innovation.'},
    {id:'davis-moore',label:'Davis and Moore',names:['Kingsley Davis','Wilbert Moore'],topic:'Social stratification',work:'Some principles of stratification (1945)',perspective:'Functionalism',
      idea:'Key phrase: functional importance. Unequal rewards motivate talented people to train for demanding, important roles; stratification supposedly benefits society through role allocation.',
      key:'Unequal rewards motivate training and allocation to important social roles',
      evaluation:'High pay does not prove importance: essential care work may be low-paid. Unequal training access can also waste talent.',
      exam:'Explain rewards → training → role allocation, then question how importance is measured.'},
    {id:'devine',label:'Devine',names:['Fiona Devine'],topic:'Social stratification',work:'Affluent Workers Revisited (1992)',perspective:'Class research',
      idea:'Key phrase: affluent workers revisited. Interviews in Luton found that higher consumption did not simply erase working-class identity or criticism of class inequality.',
      key:'Greater affluence did not simply remove working-class identities and values',
      evaluation:'Interviews reveal meanings, but a local sample limits generalisation. Revisiting Luton was not a panel following the original respondents.',
      exam:'Challenge the claim that higher consumption automatically means middle-class identity.'},
    {id:'marx',label:'Marx',names:['Karl Marx'],topic:'Social stratification',work:'selected writings on capitalism (1857–1867)',perspective:'Marxism',
      idea:'Key phrase: means of production. The bourgeoisie own productive resources; the proletariat sell labour. Exploitation and opposed interests produce class conflict.',
      key:'Ownership, exploitation and class conflict shape capitalist inequality',
      evaluation:'Weber adds status, party and varied market positions. Class ownership alone may not fully explain gender, ethnicity or social mobility.',
      exam:'Define class through ownership, not just income; explain exploitation or conflicting interests.'},
    {id:'murray',label:'Murray',names:['Charles Murray'],topic:'Social stratification',work:'Losing Ground (1984)',perspective:'New Right',
      idea:'Key phrase: welfare dependency. Murray’s contested New Right claim links welfare to an underclass whose behaviour reproduces disadvantage; this is not a description of all claimants.',
      key:'Welfare dependency and behaviour can reproduce an underclass, according to this contested view',
      evaluation:'Structural explanations emphasise insecure work and unequal opportunities. Receiving benefits does not prove low motivation or that welfare caused poverty.',
      exam:'Attribute the claim to Murray; contrast structural causes without stereotyping claimants.'},
    {id:'townsend',label:'Townsend',names:['Peter Townsend'],topic:'Social stratification',work:'Poverty in the United Kingdom (1979)',perspective:'Relative deprivation',
      idea:'Key phrase: relative deprivation. Poverty means lacking resources for customary activities and living conditions. His survey used a deprivation index, not income alone.',
      key:'Poverty can mean lacking resources for customary activities and living conditions',
      evaluation:'Choosing deprivation indicators involves judgement. Missing a customary activity may reflect preference rather than poverty, so check the resource constraint.',
      exam:'Explain resource-based exclusion from ordinary life; date any historical poverty figures.'},
    {id:'walby',label:'Walby',names:['Sylvia Walby'],topic:'Social stratification',work:'Theorizing Patriarchy (1990)',perspective:'Feminism',
      idea:'Key phrase: six patriarchal structures. Household production, paid work, state, male violence, sexuality and culture sustain male dominance in private and public life.',
      key:'Six linked patriarchal structures maintain gender inequality in private and public life',
      evaluation:'Gender inequality varies with class and ethnicity. Public participation can increase while unequal rewards and power remain; not all women share one experience.',
      exam:'Apply one structure to a concrete inequality rather than only listing six.'},
    {id:'weber',label:'Weber',names:['Max Weber'],topic:'Social stratification',work:'The Theory of Social and Economic Organization (English edition, 1947)',perspective:'Weberian approach',
      idea:'Key phrase: class, status and party. Inequality involves market position, social honour and organised power; these overlap but are not identical.',
      key:'Class, status and party are distinct but overlapping dimensions of inequality',
      evaluation:'This explains inequality beyond ownership, but Marxists question its emphasis on exploitation. Measuring prestige and power also requires judgement.',
      exam:'Match the example: market position = class; prestige = status; organised influence = party.'}
  ];
  const provenance='Original explanations from your supplied Sociology revision sheets and knowledge organisers. Named-text coverage checked against AQA GCSE Sociology 8192 Appendix B, 5 November 2026. See SOCIOLOGISTS-SOURCES.md.';
  const sociologistCards=[];
  const identifyQuiz=(item,question)=>{
    const peers=studies.filter(other=>other.topic===item.topic),position=peers.indexOf(item);
    return {question,options:[item.label,...[1,2,3].map(offset=>peers[(position+offset)%peers.length].label)]};
  };
  for(const item of studies){
    // Idea clues are original paraphrases, not claimed verbatim quotations.
    // Do not include the author's name in front tags: that would reveal the answer.
    const question=`Which sociologist${item.names.length>1?'s':''} argued that ${item.key[0].toLowerCase()+item.key.slice(1)}?`;
    const shared={tags:[item.topic,'Identify the sociologist'],sourceNote:provenance,exam:item.exam,studyId:item.id,sociologists:item.names};
    sociologistCards.push({...shared,id:'soc-sociologists-'+item.id+'-idea',question,answer:item.idea,
      quiz:identifyQuiz(item,question)});
    sociologistCards.push({...shared,tags:[item.topic,item.perspective],id:'soc-sociologists-'+item.id+'-evaluate',question:`How could you evaluate ${item.label}’s explanation in ${item.work}?`,answer:item.evaluation});
  }
  const detailRows=[
    ['parsons-school','standards','Who described school as a bridge from particularistic family treatment to universalistic social standards?','Particularistic standards depend on a specific relationship, as in families. Universalistic standards apply common rules to everyone. School supposedly prepares pupils for the latter.',true],
    ['rapoports','diversity','Which sociologists distinguished life-course family diversity from differences between historical cohorts?','Life-course diversity means stages such as parenting or retirement. Cohort diversity means differences between generations shaped by different historical experiences.',true],
    ['merton','innovation','Who distinguished innovation, which keeps success goals, from rebellion, which replaces goals and means?','Innovation accepts success goals but uses disapproved means, such as fraud for wealth. Rebellion replaces both goals and means with alternatives.',true],
    ['carlen','deals','Who used class deals and gender deals to explain some women’s offending?','The class deal promises rewards from legitimate work; the gender deal promises support from conventional family roles. Failed deals can weaken reasons to conform.',true],
    ['weber','authority','Who distinguished traditional, charismatic and rational-legal authority?','Traditional authority rests on custom; charismatic on devotion to an exceptional leader; rational-legal on accepted rules and offices. These are grounds for accepting authority.',true],
    ['walby','structures','How can you apply Walby’s six structures rather than just list them?','Match evidence to a structure: unpaid housework concerns household production; promotion barriers concern paid work. Explain how that mechanism sustains male advantage.'],
    ['becker','master-status','What is a master status in Becker’s labelling explanation?','A master status dominates how others see someone. An offender label may restrict opportunities and encourage further deviance, but people can resist it.'],
    ['cohen','which-cohen','How do Albert Cohen and Stanley Cohen differ?','Albert Cohen: status frustration and delinquent subcultures. Stanley Cohen: folk devils and moral panics. Name the correct author when applying either explanation.'],
    ['oakley','which-text','How does Oakley’s Conventional families differ from her housework research?','Conventional families questions the nuclear-family ideal. Her separate housework research challenges domestic equality. Related feminist ideas do not make these the same study.'],
    ['willis','comparison','How could you compare Willis with Bowles and Gintis in an essay?','Both explain class reproduction. Bowles and Gintis emphasise learned obedience; Willis shows active school resistance leading towards manual work. Compare the mechanisms, not just labels.']
  ];
  for(const [studyId,id,question,answer,identify] of detailRows){const item=studies.find(study=>study.id===studyId);const card={id:'soc-sociologists-'+studyId+'-'+id,question,answer,tags:[item.topic,identify?'Identify the sociologist':'Apply and compare'],exam:item.exam,sourceNote:provenance,studyId,sociologists:item.names};if(identify)card.quiz=identifyQuiz(item,question);sociologistCards.push(card);}
  subject.decks.push({id:'soc-sociologists',title:'Key Sociologists — AQA',description:'Who argued it? 60 compact cards and 30 name-recall quizzes: 25 AQA texts, 32 authors. Reveal the name, key phrase and quick exam use. Idea clues are summaries, not direct quotations.',sourceNote:provenance,cards:sociologistCards});
  window.FLASHCARD_DATA.subjects.push(subject);
})();
