/* Curated external lessons, verified 3 October 2026. See VIDEO-SOURCES.md.
   Links only: no embeds, video requests, watch tracking or account data. */
(() => {
  'use strict';
  const lesson=(title,id,extra={})=>({title,url:'https://www.youtube.com/watch?v='+id,...extra});
  window.REVISION_VIDEO_LESSONS={
    biology:{title:'Biology',scope:'AQA GCSE · Paper 1 topics · Combined & Triple',provider:'Cognito',url:'https://cognito.org/courses/gcse/biology-triple/aqa/higher/lessons/',providerLabel:'Full Cognito course · Triple Higher',topics:[
      {title:'B1 · Cell biology',lessons:[lesson('Cell structure','qHkUOlC8Nbo'),lesson('Microscopy: what it is','PB97svr7Ye8'),lesson('Light & electron microscopes','PAzs3Ooex5k'),lesson('Mitosis','UsovRxQAUZ4'),lesson('Stem cells','fp5H3SslskQ'),lesson('Diffusion','lxHMJaXOzP4'),lesson('Osmosis','vCJVXYmXkzM'),lesson('Active transport','tM0bGaaQ2jY')]},
      {title:'B2 · Organisation',lessons:[lesson('What are enzymes?','gUncqL1ul8Q'),lesson('The heart','31nyaBdC-q8')]},
      {title:'B3 · Infection & response',lessons:[lesson('The immune system & defences','k1oCiR9Y2zQ'),lesson('Vaccinations & immunisation','Rz5RxEFo2CM')]},
      {title:'B4 · Bioenergetics',lessons:[lesson('Photosynthesis','cucQtak-jco'),lesson('Aerobic & anaerobic respiration','xzDAZUZido0')]}
    ]},
    chemistry:{title:'Chemistry',scope:'AQA GCSE · Paper 1 topics · Combined & Triple',provider:'Cognito',url:'https://cognito.org/courses/gcse/chemistry-triple/aqa/higher/lessons/',providerLabel:'Full Cognito course · Triple Higher',topics:[
      {title:'C1 · Atomic structure & the periodic table',lessons:[lesson('Atoms','zuQ469vjwgo'),lesson('Development of the periodic table','NVnnIjUbXNQ')]},
      {title:'C2 · Bonding, structure & properties',lessons:[lesson('Ionic bonding','MdU44WeiLps'),lesson('Covalent bonding','7IkYm7ZgiAw')]},
      {title:'C3 · Quantitative chemistry',lessons:[lesson('Relative formula mass','-I2mwJH6MhA'),lesson('Moles & mass','kBlmEfS_P00',{higher:true})]},
      {title:'C4 · Chemical changes',lessons:[lesson('Acids & bases','Yrf3Z_TQu_k'),lesson('Introduction to electrolysis','RAEm-kJ_QkU',{note:'Includes Higher extensions'})]},
      {title:'C5 · Energy changes',lessons:[lesson('Exothermic & endothermic reactions','hNNvIsQLSV8'),lesson('Bond energy calculations','CegXaqWMyr4',{higher:true})]}
    ]},
    physics:{title:'Physics',scope:'AQA GCSE · Paper 1 topics · Combined & Triple',provider:'Cognito',url:'https://cognito.org/courses/gcse/physics-triple/aqa/higher/lessons/',providerLabel:'Full Cognito course · Triple Higher',topics:[
      {title:'P1 · Energy',lessons:[lesson('Energy stores & systems','JGwcDCeYRYo'),lesson('Efficiency','KbrqbW0um0Y')]},
      {title:'P2 · Electricity',lessons:[lesson('Introduction to circuits','rFd-vzU4_pg'),lesson('V = IR & current–voltage graphs','BbizKa6eywo')]},
      {title:'P3 · Particle model of matter',lessons:[lesson('Particle model & states of matter','zjkBMk5d3tM'),lesson('Density','m2P2DdfebiU')]},
      {title:'P4 · Atomic structure',lessons:[lesson('Atomic structure, isotopes & electron shells','GTpo1nAZqFE'),lesson('Alpha, beta & gamma radiation','1ui5YnYkYpc')]}
    ]},
    maths:{title:'Maths',scope:'Edexcel GCSE · All papers · Higher-only lessons labelled',provider:'1st Class Maths',url:'https://www.1stclassmaths.com/edexcelrevision',topics:[
      {title:'Number',lessons:[lesson('Ordering fractions','rL18ZMgCeKU'),lesson('HCF & LCM','kHLwbPwvTtw'),lesson('Standard form','y-ybXWmmSs8')]},
      {title:'Algebra',lessons:[lesson('One-step linear equations','B3ysZqiJozM'),lesson('Unknowns on both sides','mYsHbiOEYAc'),lesson('The nth term of a linear sequence','0vOwE2NHAEk'),lesson('The quadratic formula','522V7v8Y1fQ',{higher:true})]},
      {title:'Ratio & proportion',lessons:[lesson('Writing & simplifying ratios','pSKJMIJct_I'),lesson('Working with ratio','ejhYX2cku7o'),lesson('Direct & inverse proportion','AWH6wQBbpo0',{higher:true})]},
      {title:'Geometry & measures',lessons:[lesson('Area & circumference','d3qMfo5EBcU'),lesson('Trigonometry: SOHCAHTOA','lRDHqGqRNwg'),lesson('Circle theorems','dBIlCD_JF9Q',{higher:true})]},
      {title:'Probability',lessons:[lesson('Sets & Venn diagrams','WHfef-NghN8'),lesson('Probability tree diagrams','Z5BX-LbG7mI',{note:'Includes harder extensions'}),lesson('Conditional probability','nIeMiayWVvw',{higher:true})]},
      {title:'Statistics',lessons:[lesson('Averages & the range','MgwdxJzAqYo'),lesson('Drawing histograms','g7Jnrf0g2tQ',{higher:true})]}
    ]}
  };
})();
