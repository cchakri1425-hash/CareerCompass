// Centralized Career & Education Database for Career Compass

export const EDUCATION_STAGES = [
  {
    id: 'Class 8-10',
    title: 'Class 8 – 10',
    badge: 'School Student',
    icon: '🎓',
    colorClass: 'purple-icon',
    description: 'Foundational schooling focused on core science, mathematics, logic, and subject exploration.',
  },
  {
    id: 'Intermediate',
    title: 'Intermediate (11–12)',
    badge: 'Higher Secondary',
    icon: '📖',
    colorClass: 'blue-icon',
    description: 'Specialized stream selection (MPC, BiPC, MEC, CEC, HEC, Vocational).',
  },
  {
    id: 'Diploma',
    title: 'Diploma / Polytechnic',
    badge: 'Technical Diploma',
    icon: '📜',
    colorClass: 'orange-icon',
    description: '3-year hands-on technical or vocational diploma after 10th or 12th.',
  },
  {
    id: 'ITI',
    title: 'ITI (Industrial Training)',
    badge: 'Vocational Trade',
    icon: '🛠️',
    colorClass: 'green-icon',
    description: 'Short-term trade certifications in electrical, fitting, mechanical, and technical skills.',
  },
  {
    id: 'Graduation',
    title: 'Graduation / Degree',
    badge: 'Undergraduate',
    icon: '👨‍🎓',
    colorClass: 'purple-icon',
    description: 'B.Tech, MBBS, B.Com, BA, B.Sc, BBA, B.Des, LLB or equivalent bachelor degrees.',
  },
  {
    id: 'Post Graduation',
    title: 'Post Graduation',
    badge: 'Master / Doctorate',
    icon: '🔬',
    colorClass: 'indigo-icon',
    description: 'M.Tech, MD/MS, MBA, LLM, M.Sc, M.Des, or research specialization.',
  },
  {
    id: 'Working Professional',
    title: 'Working Professional',
    badge: 'Career Transition',
    icon: '💼',
    colorClass: 'brown-icon',
    description: 'Upskilling, domain switching, leadership growth, or executive certifications.',
  },
];

export const STREAMS_BY_EDUCATION = {
  'Class 8-10': [
    { id: 'Science & Maths', name: 'Science & Mathematics', icon: '🔬' },
    { id: 'Arts & Social', name: 'Arts & Social Studies', icon: '🎨' },
    { id: 'Vocational & ITI Prep', name: 'Vocational & ITI Trades', icon: '🛠️' },
    { id: 'Defence & Sports', name: 'Defence & Sports Academy', icon: '🛡️' },
    { id: 'Design & Creative Arts', name: 'Design & Creative Arts', icon: '🖌️' },
  ],
  'Intermediate': [
    { id: 'MPC', name: 'MPC (Maths, Physics, Chemistry)', icon: '📐', desc: 'Engineering, Technology, Defense, Architecture, Aviation' },
    { id: 'BiPC', name: 'BiPC (Biology, Physics, Chemistry)', icon: '🩺', desc: 'Medicine, Dentistry, Pharmacy, Biotech, Agriculture' },
    { id: 'MEC', name: 'MEC (Maths, Economics, Commerce)', icon: '📊', desc: 'Finance, CA, CS, Actuarial Science, Data Analytics' },
    { id: 'CEC', name: 'CEC (Civics, Economics, Commerce)', icon: '💼', desc: 'Business, Banking, Corporate Law, Management' },
    { id: 'HEC', name: 'HEC (History, Economics, Civics)', icon: '🏛️', desc: 'Civil Services, Law, Public Policy, Journalism' },
    { id: 'Vocational', name: 'Vocational & Technical', icon: '⚙️', desc: 'Paramedical, IT Trades, Commercial Arts, Hotel Mgmt' },
  ],
  'Diploma': [
    { id: 'Polytechnic Engg', name: 'Polytechnic Engineering', icon: '🏗️' },
    { id: 'Computer Science Diploma', name: 'Computer Science & IT Diploma', icon: '💻' },
    { id: 'Paramedical Diploma', name: 'Paramedical & Healthcare Diploma', icon: '💉' },
    { id: 'Design & Fashion Diploma', name: 'Design & Fashion Diploma', icon: '✂️' },
  ],
  'ITI': [
    { id: 'Electrician', name: 'Electrician & Power Trade', icon: '⚡' },
    { id: 'Fitter & Mechanical', name: 'Fitter & Mechanical Trade', icon: '🔧' },
    { id: 'COPA', name: 'COPA (Computer Operator)', icon: '🖥️' },
    { id: 'Machinist', name: 'Machinist & Turner Trade', icon: '⚙️' },
  ],
  'Graduation': [
    { id: 'Engineering', name: 'B.Tech / B.E (CSE, ECE, EEE, Mech, Civil)', icon: '💻' },
    { id: 'Medical Sciences', name: 'MBBS / BDS / Allied Health', icon: '🩺' },
    { id: 'Commerce & Finance', name: 'B.Com / BBA / CA Foundation', icon: '📈' },
    { id: 'Arts & Humanities', name: 'BA / LLB / Mass Communication', icon: '⚖️' },
    { id: 'Design & Media', name: 'B.Des / Animation / Fine Arts', icon: '🎨' },
    { id: 'Agriculture & Science', name: 'B.Sc Agriculture / Horticulture / Biotech', icon: '🌱' },
  ],
  'Post Graduation': [
    { id: 'Masters Engineering', name: 'M.Tech / ME / Data Science', icon: '🧠' },
    { id: 'Medical Specialization', name: 'MD / MS / Super Specialization', icon: '🏥' },
    { id: 'Business Executive', name: 'MBA / PGDM (Finance, Marketing, Tech)', icon: '💼' },
    { id: 'Law & Governance', name: 'LLM / Public Policy', icon: '📜' },
  ],
  'Working Professional': [
    { id: 'Tech Upskilling', name: 'Full Stack, AI & Cloud Architecture', icon: '🚀' },
    { id: 'Management & Leadership', name: 'Project Management & Leadership', icon: '📊' },
    { id: 'Data & Analytics', name: 'Data Science & BI Engineering', icon: '📈' },
    { id: 'Design & Product', name: 'Product Management & UI/UX', icon: '🎨' },
  ],
};

export const INTEREST_FIELDS = [
  { id: 'Technology', label: 'Technology & AI', icon: '💻', desc: 'Software, AI, Cloud, Cybersecurity, Mobile & Web' },
  { id: 'Medicine', label: 'Medicine & Health', icon: '🩺', desc: 'Healthcare, Clinical Surgery, Pharmacy, Biotech' },
  { id: 'Commerce', label: 'Business & Finance', icon: '📊', desc: 'CA, Financial Analytics, Banking, Investment' },
  { id: 'Law', label: 'Law & Governance', icon: '⚖️', desc: 'Corporate Law, Judiciary, Civil Services, Cyber Law' },
  { id: 'Design', label: 'Design & Creative', icon: '🎨', desc: 'UI/UX, Product Design, Graphic Arts, Animation' },
  { id: 'Defence', label: 'Defence & Security', icon: '🛡️', desc: 'Armed Forces, Navy, Air Force, Intelligence' },
  { id: 'Agriculture', label: 'Agriculture & Bio', icon: '🌱', desc: 'Agri-tech, Organic Science, Forestry, Genetics' },
  { id: 'Civil Services', label: 'Public Administration', icon: '🏛️', desc: 'IAS, IPS, Foreign Service, State Administration' },
  { id: 'Aviation & Hospitality', label: 'Aviation & Hospitality', icon: '✈️', desc: 'Commercial Pilot, Cabin Crew, Hotel Mgmt' },
  { id: 'Sports & Fitness', label: 'Sports & Fitness', icon: '⚽', desc: 'Sports Mgmt, Athletics, Fitness Training, Sports Tech' },
];

export const CAREERS_DATA = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    icon: '💻',
    educationLevels: ['Class 8-10', 'Intermediate', 'Diploma', 'Degree', 'Graduation', 'Post Graduation', 'Working Professional'],
    streams: ['MPC', 'Computer Science Diploma', 'Engineering', 'Tech Upskilling'],
    overview: 'Software Engineers architect, code, test, and deploy software applications, driving digital innovation across web, mobile, desktop, and cloud platforms.',
    description: 'Design and build high-performance scalable web systems, backend services, cloud architectures, and user-facing frontend applications using modern frameworks.',
    salary: '₹6 - 35 LPA (India) | $80,000 - $180,000 (Global)',
    salaryRange: { india: '₹6 - 35 LPA', abroad: '$80,000 - $180,000' },
    demand: 'Very High 🔥',
    requiredEducation: 'Class 10 ➔ Intermediate (MPC) ➔ B.Tech in CSE / IT or BCA / MCA / Coding Bootcamp',
    futureScope: 'Immense demand propelled by AI integration, Cloud scaling, SaaS, Distributed Systems, and Web3 technologies.',
    duration: '4 Years (B.Tech) / 3 Years (BCA)',
    skills: [
      'Data Structures & Algorithms',
      'JavaScript / TypeScript',
      'React.js / Next.js',
      'Node.js / Express',
      'Python & Go',
      'Database Architecture (SQL & MongoDB)',
      'Docker & AWS Cloud',
      'System Design & Microservices',
    ],
    programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'SQL'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express.js', 'Spring Boot', 'Django', 'TailwindCSS'],
    tools: ['Git & GitHub', 'VS Code', 'Postman', 'Docker', 'Kubernetes', 'Jira', 'Figma'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'],
    cloudTechnologies: ['Amazon Web Services (AWS)', 'Google Cloud Platform (GCP)', 'Vercel', 'Docker Containerization'],
    certifications: [
      'AWS Certified Developer - Associate',
      'MetaData Frontend/Backend Developer Certificate',
      'Oracle Certified Associate Java Programmer',
      'Google Associate Cloud Engineer',
    ],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'TCS', 'Infosys', 'Wipro', 'Adobe', 'Uber', 'Atlassian'],
    learningResources: [
      { title: 'FreeCodeCamp Full Stack Developer Curriculum', url: 'https://www.freecodecamp.org' },
      { title: 'MDN Web Docs (Official JS & Web Standards)', url: 'https://developer.mozilla.org' },
      { title: 'LeetCode Algorithmic Practice', url: 'https://leetcode.com' },
      { title: 'GeeksforGeeks Computer Science Portal', url: 'https://geeksforgeeks.org' },
    ],
    books: [
      'Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin',
      'Introduction to Algorithms (CLRS) by Cormen, Leiserson, Rivest, Stein',
      'Designing Data-Intensive Applications by Martin Kleppmann',
      'You Don\'t Know JS (Book Series) by Kyle Simpson',
    ],
    videos: [
      { title: 'CS50: Introduction to Computer Science - Harvard University', url: 'https://youtube.com' },
      { title: 'Full Stack MERN Architecture Masterclass', url: 'https://youtube.com' },
      { title: 'System Design Interview Fundamentals', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'developer-roadmap (Roadmaps for Developers)', url: 'https://github.com/kamranahmedse/developer-roadmap' },
      { title: 'coding-interview-university (Complete CS study plan)', url: 'https://github.com/jwasham/coding-interview-university' },
      { title: 'freeCodeCamp (Open source codebase & curriculum)', url: 'https://github.com/freeCodeCamp/freeCodeCamp' },
    ],
    interviewPrep: [
      'Practice 150+ standard Data Structures & Algorithms questions on Arrays, Trees, Graphs, and Dynamic Programming.',
      'Prepare System Design concepts: Caching, Load Balancing, Database Sharding, and REST/GraphQL APIs.',
      'Be ready to explain past projects, technical trade-offs, and behavioral STAR stories.',
    ],
    resumeTips: [
      'Include live links to deployed web projects and GitHub repositories.',
      'Quantify results (e.g. "Optimized API latency by 40% using Redis caching").',
      'Highlight expertise in specific tech stacks like MERN or AWS.',
    ],
    projects: [
      'Full Stack E-Commerce Engine with Real-Time Payment Gateway Integration',
      'Collaborative Real-time Workspace App using WebSockets & React',
      'DevOps Automated CI/CD Deployment Pipeline using Docker & GitHub Actions',
    ],
    careerGrowth: [
      'Junior Developer (0-2 Yrs) ➔ Software Engineer (2-5 Yrs) ➔ Senior Software Engineer (5-8 Yrs) ➔ Lead Architect / Engineering Manager (8+ Yrs)',
    ],
    industryTrends: [
      'AI-assisted coding with Copilot & Claude Code',
      'Serverless computing and edge rendering',
      'Micro-frontend architecture and WebAssembly',
    ],
    aiImpact: 'AI enhances developer productivity by auto-generating boilerplate, but human software engineers remain essential for system design, security, domain logic, and complex architectural decisions.',
    advantages: [
      'High remuneration and performance bonuses',
      'Flexibility for remote work and global opportunities',
      'Continuous creativity and impactful problem solving',
    ],
    challenges: [
      'Need for continuous upskilling as tech stacks evolve rapidly',
      'Tight project deadlines and occasional long hours',
    ],
    faqs: [
      {
        question: 'Can I become a Software Engineer without a CS degree?',
        answer: 'Yes! Demonstrable coding skills, open-source contributions, portfolio projects, and certifications are widely respected by modern tech employers.',
      },
      {
        question: 'Which programming language should I learn first?',
        answer: 'Python or JavaScript are excellent starting languages due to their clear syntax and broad industry application.',
      },
    ],
    relatedCareers: ['data-scientist', 'ai-engineer', 'cyber-security-specialist', 'ui-ux-designer'],
  },

  {
    slug: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    category: 'Technology',
    icon: '🤖',
    educationLevels: ['Intermediate', 'Degree', 'Graduation', 'Post Graduation', 'Working Professional'],
    streams: ['MPC', 'Engineering', 'Masters Engineering', 'Tech Upskilling'],
    overview: 'AI & ML Engineers build intelligent systems, large language models, neural networks, and computer vision tools that automate decision making.',
    description: 'Train machine learning models, implement deep learning algorithms, fine-tune Generative AI models, and deploy scalable AI pipelines into production systems.',
    salary: '₹8 - 45 LPA (India) | $110,000 - $220,000 (Global)',
    salaryRange: { india: '₹8 - 45 LPA', abroad: '$110,000 - $220,000' },
    demand: 'Explosive 🔥',
    requiredEducation: 'Intermediate (MPC) ➔ B.Tech (CSE / AI & ML) or M.Tech / M.Sc in Artificial Intelligence / Data Science',
    futureScope: 'Rapidly transforming every industry—healthcare, finance, autonomous driving, robotics, and generative content.',
    duration: '4 Years (B.Tech) + Optional 2 Years (M.Tech)',
    skills: [
      'Python & C++',
      'PyTorch / TensorFlow',
      'Linear Algebra, Calculus & Probability',
      'Natural Language Processing (NLP)',
      'LLM Fine-tuning & RAG Systems',
      'Computer Vision (OpenCV)',
      'MLOps & Model Deployment',
    ],
    programmingLanguages: ['Python', 'C++', 'R', 'SQL', 'Julia'],
    frameworks: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'Scikit-Learn', 'FastAPI'],
    tools: ['Jupyter Notebooks', 'Weights & Biases', 'MLflow', 'Docker', 'CUDA / GPU Compute', 'Git'],
    databases: ['Pinecone (Vector DB)', 'Milvus', 'ChromaDB', 'PostgreSQL', 'MongoDB'],
    cloudTechnologies: ['AWS SageMaker', 'Google Vertex AI', 'Azure ML Studio', 'RunPod GPU Cloud'],
    certifications: [
      'AWS Certified Machine Learning - Specialty',
      'TensorFlow Developer Certificate',
      'DeepLearning.AI Machine Learning Specialization (Andrew Ng)',
    ],
    topCompanies: ['OpenAI', 'Google DeepMind', 'Microsoft', 'NVIDIA', 'Meta', 'Amazon', 'TCS Research', 'Fractal Analytics'],
    learningResources: [
      { title: 'DeepLearning.AI Courses by Andrew Ng', url: 'https://deeplearning.ai' },
      { title: 'Fast.ai Practical Deep Learning for Coders', url: 'https://fast.ai' },
      { title: 'Hugging Face NLP & Transformers Guide', url: 'https://huggingface.co' },
    ],
    books: [
      'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow by Aurélien Géron',
      'Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville',
      'Pattern Recognition and Machine Learning by Christopher Bishop',
    ],
    videos: [
      { title: 'Neural Networks: Zero to Hero by Andrej Karpathy', url: 'https://youtube.com' },
      { title: 'Machine Learning Specialization Lecture Series', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'transformers (Hugging Face PyTorch Transformers)', url: 'https://github.com/huggingface/transformers' },
      { title: 'langchain (Building LLM applications)', url: 'https://github.com/langchain-ai/langchain' },
    ],
    interviewPrep: [
      'Master core mathematical proofs behind Gradient Descent, Backpropagation, and Attention Mechanisms.',
      'Practice hands-on coding of Transformer architectures, Convolutional Neural Networks, and Data Pipelines.',
    ],
    resumeTips: [
      'Highlight real-world ML benchmarks achieved (e.g. "Improved NLP model accuracy by 14% using BERT fine-tuning").',
      'Include Kaggle competition rankings and published research or GitHub ML tools.',
    ],
    projects: [
      'Custom Retrieval-Augmented Generation (RAG) Bot for Technical Documentation',
      'Real-time Object Detection and Tracking System using YOLO & OpenCV',
      'Fine-tuned Multi-modal Generative Model for Image & Text Generation',
    ],
    careerGrowth: [
      'Junior ML Engineer ➔ AI Research Engineer ➔ Senior AI Architect ➔ Head of AI Research',
    ],
    industryTrends: ['Generative AI & Agentic Systems', 'Edge AI & On-device SLMs', 'Autonomous AI Agents'],
    aiImpact: 'Core driving force of the current AI revolution; creating tremendous job opportunities globally.',
    advantages: ['Cutting-edge technological impact', 'Top-tier compensation packages', 'Global research demand'],
    challenges: ['Requires solid mathematical foundation', 'Rapidly changing model architectures'],
    faqs: [
      {
        question: 'Is math essential for AI Engineering?',
        answer: 'Yes, linear algebra, multivariable calculus, and probability theory form the foundation of ML algorithms.',
      },
    ],
    relatedCareers: ['software-engineer', 'data-scientist', 'cyber-security-specialist'],
  },

  {
    slug: 'data-scientist',
    title: 'Data Scientist & Analytics Lead',
    category: 'Technology',
    icon: '📊',
    educationLevels: ['Intermediate', 'Degree', 'Graduation', 'Post Graduation', 'Working Professional'],
    streams: ['MPC', 'MEC', 'Engineering', 'Commerce & Finance', 'Data & Analytics'],
    overview: 'Data Scientists extract actionable business insights, predictive models, and statistical trends from massive datasets.',
    description: 'Combine statistics, machine learning, data engineering, and business domain knowledge to solve strategic problems and drive business growth.',
    salary: '₹7 - 32 LPA (India) | $90,000 - $175,000 (Global)',
    salaryRange: { india: '₹7 - 32 LPA', abroad: '$90,000 - $175,000' },
    demand: 'High Demand 🔥',
    requiredEducation: 'Intermediate (MPC / MEC) ➔ B.Tech / B.Sc Statistics / B.Com Data Analytics / M.Sc Data Science',
    futureScope: 'Crucial role in data-driven decision making across e-commerce, banking, healthcare, retail, and tech.',
    duration: '3-4 Years',
    skills: [
      'Python & R Programming',
      'Advanced SQL & Data Warehousing',
      'Exploratory Data Analysis (EDA)',
      'Statistical Inference & Hypothesis Testing',
      'Tableau & PowerBI Data Visualization',
      'Scikit-Learn Machine Learning',
      'Big Data (Spark / Hadoop)',
    ],
    programmingLanguages: ['Python', 'SQL', 'R', 'SAS'],
    frameworks: ['Pandas', 'NumPy', 'Scikit-Learn', 'SciPy', 'Statsmodels', 'PySpark'],
    tools: ['Jupyter', 'Tableau', 'Power BI', 'Snowflake', 'Databricks', 'Git'],
    databases: ['PostgreSQL', 'Snowflake', 'BigQuery', 'Amazon Redshift', 'MongoDB'],
    cloudTechnologies: ['AWS Data Wrangler', 'GCP BigQuery', 'Azure Synapse Analytics'],
    certifications: [
      'IBM Data Science Professional Certificate',
      'Google Data Analytics Professional Certificate',
      'Microsoft Certified: Azure Data Scientist Associate',
    ],
    topCompanies: ['Amazon', 'Flipkart', 'Fractal Analytics', 'Mu Sigma', 'JPMorgan Chase', 'Google', 'Deloitte', 'McKinsey'],
    learningResources: [
      { title: 'Kaggle Data Science Tutorials & Competitions', url: 'https://kaggle.com' },
      { title: 'DataCamp Interactive Data Science Courses', url: 'https://datacamp.com' },
    ],
    books: [
      'Storytelling with Data: A Data Visualization Guide by Cole Nussbaumer Knaflic',
      'Practical Statistics for Data Scientists by Peter Bruce & Andrew Bruce',
    ],
    videos: [
      { title: 'Python for Data Science & Machine Learning Bootcamp', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'awesome-datascience (Curated list of DS resources)', url: 'https://github.com/academic/awesome-datascience' },
    ],
    interviewPrep: [
      'Practice writing complex SQL queries involving window functions, aggregations, and subqueries.',
      'Be prepared to explain A/B testing methodology, hypothesis testing, and model validation metrics.',
    ],
    resumeTips: [
      'Showcase portfolio projects with clear business insights derived.',
      'Include links to Kaggle notebooks or interactive Tableau dashboards.',
    ],
    projects: [
      'Customer Churn Prediction Model for Telecom Enterprise',
      'E-Commerce Sales Forecasting Engine using Time Series Analysis',
    ],
    careerGrowth: [
      'Data Analyst ➔ Junior Data Scientist ➔ Senior Data Scientist ➔ Principal Lead Scientist ➔ Chief Data Officer (CDO)',
    ],
    industryTrends: ['Automated Machine Learning (AutoML)', 'Real-time Streaming Analytics', 'Data Privacy Governance'],
    aiImpact: 'AI tools assist in data cleaning and script generation, allowing Data Scientists to focus on strategic insights and business impact.',
    advantages: ['High analytical job satisfaction', 'Universal industry demand', 'Lucrative salary potential'],
    challenges: ['Handling messy unstructured data', 'Translating complex statistical metrics into simple business language'],
    faqs: [
      {
        question: 'What is the difference between Data Analyst and Data Scientist?',
        answer: 'Data Analysts focus on past data trends and visualization, whereas Data Scientists build predictive machine learning models for future forecasting.',
      },
    ],
    relatedCareers: ['software-engineer', 'ai-engineer', 'chartered-accountant'],
  },

  {
    slug: 'doctor-mbbs',
    title: 'MBBS Doctor & Clinical Specialist',
    category: 'Medicine',
    icon: '🩺',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation', 'Post Graduation'],
    streams: ['BiPC', 'Medical Sciences', 'Medical Specialization'],
    overview: 'Medical Doctors diagnose illnesses, prescribe therapeutic care, perform life-saving clinical procedures, and safeguard public health.',
    description: 'Diagnose diseases, manage patient treatment plans, conduct surgeries, and specialize in medical fields like Cardiology, Neurology, Pediatrics, or Surgery.',
    salary: '₹8 - 40 LPA (Starting) | ₹50 LPA - ₹1.5 Cr+ (Specialists/Surgeons)',
    salaryRange: { india: '₹8 - 50 LPA+', abroad: '$150,000 - $400,000+' },
    demand: 'Extremely High 🏥',
    requiredEducation: 'Class 10 ➔ Intermediate (BiPC) ➔ NEET-UG Entrance ➔ MBBS (5.5 Yrs) ➔ NEET-PG / INI-CET ➔ MD / MS Specialization',
    futureScope: 'Evergreen, high-prestige profession with lifelong societal impact, specialized surgical demand, and global medical practice.',
    duration: '5.5 Years (MBBS) + 3 Years (MD/MS)',
    skills: [
      'Clinical Diagnosis & Patient Examination',
      'Human Anatomy & Pathology',
      'Pharmacology & Surgical Procedures',
      'Emergency Resuscitation & Critical Care',
      'Empathy, Communication & Ethics',
    ],
    programmingLanguages: ['N/A (Medical Science Domain)'],
    frameworks: ['Clinical Guidelines (WHO / ICMR)', 'Diagnostic Protocols'],
    tools: ['Stethoscope', 'Surgical Equipment', 'MRI / CT Scanners', 'EHR Software', 'Ultrasound Machine'],
    databases: ['Electronic Health Records (EHR)', 'PubMed Medical Library'],
    cloudTechnologies: ['Telemedicine Platforms', 'Hospital Management Systems (HMS)'],
    certifications: [
      'MBBS Registration (National Medical Commission - NMC)',
      'Basic Life Support (BLS) & Advanced Cardiac Life Support (ACLS)',
      'Board Certification in MD / MS / DNB',
    ],
    topCompanies: ['AIIMS', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'Narayana Health'],
    learningResources: [
      { title: 'PubMed Central Open Medical Research', url: 'https://ncbi.nlm.nih.gov/pmc' },
      { title: 'UpToDate Clinical Decision Support Tool', url: 'https://uptodate.com' },
    ],
    books: [
      'Harrison\'s Principles of Internal Medicine',
      'Gray\'s Anatomy for Students by Richard Drake',
      'Robbins & Cotran Pathologic Basis of Disease',
      'KD Tripathi Essentials of Medical Pharmacology',
    ],
    videos: [
      { title: 'NEET-UG Biology & Chemistry Prep Series', url: 'https://youtube.com' },
      { title: 'Clinical Examination Techniques & Case Presentations', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'awesome-medical-resources (Open clinical guides)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Clear NEET-UG with top rank for premier government medical colleges like AIIMS.',
      'Prepare clinical case scenarios, viva voce questions, and internship rotations.',
    ],
    resumeTips: [
      'Highlight medical college honors, clinical rotation specialties, and surgical assistant counts.',
      'Include published research papers in indexed medical journals.',
    ],
    projects: [
      'Clinical Research Study on Regional Prevalence of Lifestyle Diseases',
      'Community Health Camp Initiative for Rural Preventive Care',
    ],
    careerGrowth: [
      'Medical Intern ➔ Resident Doctor (Junior Resident) ➔ Senior Resident ➔ Assistant Professor / Consultant Surgeon ➔ Medical Director / Department Head',
    ],
    industryTrends: ['Robotic Assisted Surgery', 'Telemedicine & AI Diagnostic Imaging', 'Genomic Medicine'],
    aiImpact: 'AI assists in early radiological imaging analysis and diagnostic triage, but patient examination, surgical care, and medical decisions remain human-driven.',
    advantages: ['Highest societal respect and purpose', 'Exceptional job security and stability', 'Lifelong rewarding practice'],
    challenges: ['Intense study duration (8-10 years)', 'High emotional stress and rigorous duty shifts'],
    faqs: [
      {
        question: 'Is NEET mandatory for MBBS in India?',
        answer: 'Yes, NEET-UG is the single mandatory entrance exam for admission to all government and private medical colleges in India.',
      },
    ],
    relatedCareers: ['bds-dentist', 'pharmacist', 'biotechnologist'],
  },

  {
    slug: 'chartered-accountant',
    title: 'Chartered Accountant (CA)',
    category: 'Commerce',
    icon: '📊',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation', 'Working Professional'],
    streams: ['MEC', 'CEC', 'Commerce & Finance'],
    overview: 'Chartered Accountants manage corporate finances, statutory audits, tax compliance, corporate restructuring, and strategic business consulting.',
    description: 'Perform financial audits, strategic tax planning, corporate finance advisory, forensic accounting, and regulatory compliance for businesses and individuals.',
    salary: '₹8 - 30 LPA (Starting) | ₹50 LPA+ (Experienced Partners / CFOs)',
    salaryRange: { india: '₹8 - 35 LPA', abroad: '$80,000 - $160,000' },
    demand: 'High Demand 📈',
    requiredEducation: 'Class 10 ➔ Intermediate (MEC / CEC / Any Stream) ➔ CA Foundation ➔ CA Intermediate + 2 Yrs Articleship ➔ CA Final',
    futureScope: 'Indispensable role across every corporate enterprise, financial firm, government taxation department, and independent practice.',
    duration: '4.5 - 5 Years',
    skills: [
      'Financial Accounting & Reporting (Ind AS / IFRS)',
      'Statutory & Internal Auditing',
      'Direct & Indirect Taxation (GST & Income Tax)',
      'Corporate Finance & Valuation',
      'Risk Management & Compliance',
      'Tally, SAP & Financial Tools',
    ],
    programmingLanguages: ['Advanced Excel VBA', 'SQL (Data Audit)'],
    frameworks: ['Indian Accounting Standards (Ind AS)', 'International Financial Reporting Standards (IFRS)'],
    tools: ['Tally Prime', 'SAP ERP', 'MS Excel Advanced', 'Zoho Books', 'Income Tax & GST Portals'],
    databases: ['Corporate ERP Databases', 'Financial Compliance Systems'],
    cloudTechnologies: ['Cloud Accounting (QuickBooks Online, Xero)'],
    certifications: [
      'ICAI Chartered Accountant Certification (Fellow/Associate Member)',
      'Certified Public Accountant (CPA - US)',
      'Disa / CISA (Information Systems Audit)',
    ],
    topCompanies: ['Deloitte', 'PwC', 'EY (Ernst & Young)', 'KPMG', 'HDFC Bank', 'ICICI Bank', 'Reliance', 'Tata Sons'],
    learningResources: [
      { title: 'ICAI Official BOS Knowledge Portal', url: 'https://boslive.icai.org' },
      { title: 'Taxmann Tax & Corporate Laws Portal', url: 'https://taxmann.com' },
    ],
    books: [
      'Financial Reporting by CA Parveen Sharma',
      'Advanced Auditing and Professional Ethics by CA Pankaj Garg',
      'Direct Taxes Law & Practice by Dr. V.K. Singhania',
    ],
    videos: [
      { title: 'CA Foundation & Intermediate Complete Prep Series', url: 'https://youtube.com' },
      { title: 'Practical GST & Income Tax Return Filing Masterclass', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'financial-modeling-templates (Excel & Valuation Models)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Master core concepts of Accounting Standards, GST laws, Audit procedures, and Capital Budgeting.',
      'Be prepared for technical case studies during Articleship and Big 4 placement rounds.',
    ],
    resumeTips: [
      'Highlight articleship experience at reputed audit firms and major corporate audit clients handled.',
      'List CA Exam pass attempts and specific domain expertise (Taxation vs Audit vs M&A).',
    ],
    projects: [
      'Statutory Financial Audit of Mid-Sized Manufacturing Company',
      'Corporate Tax Optimization Strategy for Tech Startup',
    ],
    careerGrowth: [
      'CA Articleship Trainee ➔ Qualified CA / Audit Associate ➔ Senior Manager ➔ Financial Controller / Audit Partner ➔ Chief Financial Officer (CFO)',
    ],
    industryTrends: ['Automated Tax Compliance Tools', 'Forensic Data Analytics', 'ESG Financial Reporting'],
    aiImpact: 'AI automates routine bookkeeping and transactional audits, enabling CAs to act as high-value strategic financial advisors and business partners.',
    advantages: ['Respected prestigious title', 'High financial independence & option for private practice', 'Exceptional financial acumen'],
    challenges: ['Rigorous multi-stage examination pass rates', 'Peak tax season pressure and audit deadlines'],
    faqs: [
      {
        question: 'Can Science (MPC) students become a Chartered Accountant?',
        answer: 'Yes! Students from any stream (Science, Commerce, or Arts) can clear CA Foundation and pursue CA.',
      },
    ],
    relatedCareers: ['company-secretary', 'corporate-lawyer', 'data-scientist'],
  },

  {
    slug: 'corporate-lawyer',
    title: 'Corporate Lawyer & Legal Counsel',
    category: 'Law',
    icon: '⚖️',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation', 'Post Graduation'],
    streams: ['HEC', 'CEC', 'MPC', 'Arts & Humanities', 'Law & Governance'],
    overview: 'Corporate Lawyers draft corporate agreements, manage mergers & acquisitions (M&A), handle corporate litigation, and protect intellectual property.',
    description: 'Advise business enterprises on statutory regulations, contract negotiation, corporate governance, intellectual property rights, and dispute resolution.',
    salary: '₹7 - 35 LPA (Tier-1 Law Firms) | $90,000 - $190,000 (Global)',
    salaryRange: { india: '₹7 - 35 LPA', abroad: '$90,000 - $190,000' },
    demand: 'High Demand ⚖️',
    requiredEducation: 'Class 10 ➔ Intermediate (Any Stream) ➔ CLAT Entrance ➔ 5-Year Integrated BA LLB / BBA LLB or 3-Year LLB after Degree ➔ Bar Council Registration',
    futureScope: 'High corporate demand driven by venture funding, international trade, IP rights, cross-border M&A, and tech regulation.',
    duration: '5 Years (Integrated LLB) / 3 Years (Post Graduation LLB)',
    skills: [
      'Legal Drafting & Contract Negotiation',
      'Corporate & Company Law (Companies Act 2013)',
      'Mergers & Acquisitions (M&A) Advisory',
      'Intellectual Property Law (IPR)',
      'Analytical Reasoning & Litigation Strategy',
      'Legal Research Tools (Manupatra / SCC Online)',
    ],
    programmingLanguages: ['N/A (Legal & Regulatory Domain)'],
    frameworks: ['Companies Act 2013', 'SEBI Regulations', 'Arbitration & Conciliation Act'],
    tools: ['SCC Online', 'Manupatra', 'LexisNexis', 'MS Word Advanced', 'Contract Automation Software'],
    databases: ['Indian Kanoon Database', 'Supreme Court & High Court Case Registries'],
    cloudTechnologies: ['Cloud Contract Repositories (DocuSign, Ironclad)'],
    certifications: [
      'All India Bar Examination (AIBE Certification)',
      'Diploma in Corporate Law & M&A',
      'Cyber Law & Data Privacy Certification',
    ],
    topCompanies: ['AZB & Partners', 'Cyril Amarchand Mangaldas', 'Shardul Amarchand Mangaldas', 'Khaitan & Co', 'Trilegal', 'TCS Legal', 'Amazon Legal'],
    learningResources: [
      { title: 'Bar Council of India Official Portal', url: 'https://barcouncilofindia.org' },
      { title: 'SCC Online Legal Research Database', url: 'https://scconline.com' },
    ],
    books: [
      'Company Law by Avtar Singh',
      'The Law of Contract & Specific Relief by Pollock & Mulla',
      'Constitutional Law of India by H.M. Seervai',
    ],
    videos: [
      { title: 'CLAT Entrance Preparation Strategy & Legal Reasoning', url: 'https://youtube.com' },
      { title: 'Corporate Contract Drafting Masterclass', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'awesome-legaltech (Legal tech tools and contract templates)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Master core legal principles of Indian Contract Act, Company Law, and Constitutional Law.',
      'Practice analyzing corporate transaction case studies and drafting non-disclosure/employment contracts.',
    ],
    resumeTips: [
      'Detail internship stints at top corporate law firms or senior High Court advocates.',
      'Highlight moot court competition victories and legal research publications.',
    ],
    projects: [
      'Drafting Term Sheet and Due Diligence Report for Angel Investor Funding',
      'Comprehensive Analysis of Data Protection & Privacy Compliance (DPDP Act)',
    ],
    careerGrowth: [
      'Junior Legal Associate ➔ Senior Associate ➔ Principal Associate ➔ Law Firm Partner / General Counsel',
    ],
    industryTrends: ['AI Contract Review Software', 'Data Privacy Law Compliance', 'International Commercial Arbitration'],
    aiImpact: 'AI legal tools streamline initial contract scanning and research, allowing Corporate Lawyers to focus on complex deal negotiation and strategic advocacy.',
    advantages: ['High financial reward and prestige', 'Intellectually stimulating work environment', 'Global corporate influence'],
    challenges: ['Long work hours during active corporate deals', 'High attention to detail required in legal documentation'],
    faqs: [
      {
        question: 'Is CLAT required for entering law school?',
        answer: 'CLAT is the national entrance exam for National Law Universities (NLUs). Other top institutes conduct exams like AILET, LSAT India, or State CETs.',
      },
    ],
    relatedCareers: ['chartered-accountant', 'civil-services-ias', 'company-secretary'],
  },

  {
    slug: 'ui-ux-designer',
    title: 'UI/UX & Product Designer',
    category: 'Design',
    icon: '🎨',
    educationLevels: ['Class 8-10', 'Intermediate', 'Diploma', 'Degree', 'Graduation', 'Working Professional'],
    streams: ['Design & Creative Arts', 'MPC', 'MEC', 'Design & Media', 'Design & Product'],
    overview: 'UI/UX & Product Designers research user behaviors, craft intuitive visual interfaces, and design delightful digital product experiences.',
    description: 'Conduct user research, design wireframes and interactive prototypes, establish design systems, and collaborate with engineers to launch digital apps.',
    salary: '₹5 - 25 LPA (India) | $75,000 - $160,000 (Global)',
    salaryRange: { india: '₹5 - 25 LPA', abroad: '$75,000 - $160,000' },
    demand: 'High Demand 🎨',
    requiredEducation: 'Class 10 ➔ Intermediate (Any Stream) ➔ UCEED / NID Entrance ➔ B.Des / B.Sc UI/UX or Portfolio Bootcamp',
    futureScope: 'High demand across consumer tech, SaaS, mobile apps, gaming, e-commerce, and wearable tech interfaces.',
    duration: '4 Years (B.Des) / 1 Year (Self-Taught Portfolio)',
    skills: [
      'User Research & Usability Testing',
      'Wireframing & Information Architecture',
      'Visual Design & Typography',
      'Figma & Interactive Prototyping',
      'Design Systems & Component Libraries',
      'Micro-animations & Interaction Design',
      'Basic HTML / CSS Fundamentals',
    ],
    programmingLanguages: ['HTML5', 'CSS3', 'JavaScript (Basics for Design Systems)'],
    frameworks: ['Design Tokens', 'Tailwind CSS Concepts', 'Atomic Design Methodology'],
    tools: ['Figma', 'Adobe XD', 'Principle', 'Framer', 'Protopie', 'LottieFiles', 'Miro'],
    databases: ['User Analytics (Hotjar, Mixpanel, Google Analytics)'],
    cloudTechnologies: ['Figma Cloud', 'Storybook Design System Platform'],
    certifications: [
      'Google UX Design Professional Certificate',
      'NID / IIT Design Certification',
      'Nielsen Norman Group UX Master Certification',
    ],
    topCompanies: ['Apple', 'Google', 'Airbnb', 'Swiggy', 'Zomato', 'CRED', 'Razorpay', 'Microsoft', 'Adobe'],
    learningResources: [
      { title: 'Figma Official Learn Hub', url: 'https://figma.com/resources/learn' },
      { title: 'Nielsen Norman Group UX Articles', url: 'https://nngroup.com' },
      { title: 'Laws of UX (Interaction Design Rules)', url: 'https://lawsofux.com' },
    ],
    books: [
      'The Design of Everyday Things by Don Norman',
      'Don\'t Make Me Think by Steve Krug',
      'Refactoring UI by Adam Wathan & Steve Schoger',
    ],
    videos: [
      { title: 'Google UX Design Certificate Complete Course', url: 'https://youtube.com' },
      { title: 'Figma Auto-Layout & Design Systems Tutorial', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'awesome-design-systems (Collection of top UI design systems)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Prepare a strong online portfolio showcasing 3 detailed case studies with problem statements, user journey maps, and wireframe iterations.',
      'Be ready to perform a live whiteboarding design challenge during interviews.',
    ],
    resumeTips: [
      'Portfolio link must be at the very top of your resume.',
      'Highlight measurable metric impacts (e.g. "Redesigned checkout flow, increasing conversion rate by 22%").',
    ],
    projects: [
      'End-to-End Mobile App Redesign for Local Public Transport Booking',
      'Comprehensive Multi-Theme Design System in Figma with Tokens & Components',
    ],
    careerGrowth: [
      'Junior UI/UX Designer ➔ Product Designer ➔ Senior UI/UX Lead ➔ Staff Product Designer ➔ VP of Design / Head of Product',
    ],
    industryTrends: ['AI-powered Generative UI Generation', 'Spatial UI for AR/VR Vision Pro', 'Voice & Gesture UI'],
    aiImpact: 'AI tools generate quick layout inspiration and iconography, freeing designers to focus on deep user empathy, architecture, and brand story.',
    advantages: ['Creative fulfillment & visual impact', 'High remote work flexibility', 'Rapidly growing tech demand'],
    challenges: ['Designing for diverse accessibility needs', 'Balancing user desires with business engineering constraints'],
    faqs: [
      {
        question: 'Do UI/UX designers need to code?',
        answer: 'Coding is not strictly mandatory, but understanding basic HTML, CSS, and component state greatly improves developer collaboration.',
      },
    ],
    relatedCareers: ['software-engineer', 'ai-engineer'],
  },

  {
    slug: 'civil-services-ias',
    title: 'Civil Services Officer (IAS / IPS / IFS)',
    category: 'Civil Services',
    icon: '🏛️',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation', 'Post Graduation'],
    streams: ['HEC', 'Arts & Social', 'Engineering', 'Medical Sciences', 'Arts & Humanities'],
    overview: 'Civil Servants lead public administration, policy formulation, district governance, law and order enforcement, and international diplomacy.',
    description: 'Administer government departments, execute social welfare programs, maintain law & order (IPS), manage district collectorates (IAS), or represent India abroad (IFS).',
    salary: '₹7 - 25 LPA (Pay Level 10-17 + Government Housing, Security & Perks)',
    salaryRange: { india: '₹7 - 25 LPA + Perks & Allowances', abroad: 'Diplomatic Allowances (IFS)' },
    demand: 'Prestigious & Highly Competitive 🇮🇳',
    requiredEducation: 'Class 10 ➔ Intermediate (Any Stream) ➔ Graduation (Any Degree) ➔ UPSC Civil Services Exam (Prelims, Mains & Personality Test Interview)',
    futureScope: 'Pinnacle of Indian public administration, offering immense societal authority, policy decision-making, and public leadership.',
    duration: '3 Years (Graduation) + 1-2 Years (UPSC Preparation)',
    skills: [
      'Public Administration & Governance',
      'Indian Constitution & Policy Making',
      'Analytical Thinking & Ethics (GS Paper 4)',
      'Leadership & Crisis Management',
      'Communication & Public Relations',
    ],
    programmingLanguages: ['N/A (Public Administration Domain)'],
    frameworks: ['Indian Constitution', 'Five Year Development Frameworks', 'National e-Governance Plan'],
    tools: ['Government Portals', 'e-Office File Management', 'District Administrative Dashboards'],
    databases: ['National Census Database', 'NITI Aayog Policy Repositories'],
    cloudTechnologies: ['Digital India Cloud Platforms (NIC Cloud)'],
    certifications: [
      'UPSC Civil Services Selection Certificate',
      'LBSNAA Foundational Training Certification (Mussoorie)',
    ],
    topCompanies: ['Government of India', 'State Government Secretariats', 'Ministry of External Affairs', 'United Nations Organs'],
    learningResources: [
      { title: 'UPSC Official Exam Portal', url: 'https://upsc.gov.in' },
      { title: 'PIB (Press Information Bureau Government Updates)', url: 'https://pib.gov.in' },
    ],
    books: [
      'Indian Polity by M. Laxmikanth',
      'Indian Art and Culture by Nitin Singhania',
      'India\'s Struggle for Independence by Bipan Chandra',
      'Certificate Physical and Human Geography by Goh Cheng Leong',
    ],
    videos: [
      { title: 'UPSC Prelims & Mains Preparation Strategy', url: 'https://youtube.com' },
      { title: 'LBSNAA IAS Academy Mussoorie Officer Training Overview', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'upsc-notes-repository (Open curated GS notes)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Stay updated with current national and international affairs via daily newspaper reading (The Hindu / Indian Express).',
      'Practice answer writing for 4 General Studies Mains papers and your chosen Optional Subject.',
    ],
    resumeTips: [
      'Focus on Graduation academic background, extracurricular leadership, and Detailed Application Form (DAF) entries.',
    ],
    projects: [
      'District Sanitation and Cleanliness Campaign Execution Strategy',
      'Policy Research Draft on Primary Healthcare Improvement in Rural Districts',
    ],
    careerGrowth: [
      'Sub-Divisional Magistrate (SDM) ➔ District Collector (DM) / Superintendent of Police (SP) ➔ Divisional Commissioner ➔ State Principal Secretary ➔ Cabinet Secretary of India',
    ],
    industryTrends: ['e-Governance & Direct Benefit Transfer', 'AI in Public Service Delivery', 'Smart Cities Infrastructure'],
    aiImpact: 'AI assists civil servants in analyzing large-scale welfare data and satellite imagery for agriculture and urban planning.',
    advantages: ['Highest public prestige and nation-building impact', 'Complete job security and lifetime pension/perks', 'Unmatched leadership scope'],
    challenges: ['Extremely competitive exam (~0.1% pass rate)', 'Frequent transfers and administrative pressure'],
    faqs: [
      {
        question: 'Which degree is best for UPSC preparation?',
        answer: 'Any recognized bachelor degree (B.A, B.Sc, B.Tech, B.Com, MBBS) qualifies you for the UPSC exam.',
      },
    ],
    relatedCareers: ['corporate-lawyer', 'defence-officer'],
  },

  {
    slug: 'defence-officer',
    title: 'Defence Officer (Army / Navy / Air Force)',
    category: 'Defence',
    icon: '🛡️',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation'],
    streams: ['MPC', 'Defence & Sports', 'Engineering', 'Science & Maths'],
    overview: 'Defence Officers protect national sovereignty, command military units, pilot fighter jets, and lead strategic national defense operations.',
    description: 'Lead soldiers and defense teams in tactical combat, intelligence, strategic defense operations, military engineering, aviation, or naval navigation.',
    salary: '₹8 - 28 LPA + Free Housing, Canteen, Medical & Lifetime Pension',
    salaryRange: { india: '₹8 - 28 LPA + Military Allowances' },
    demand: 'Honorary & High Demand 🇮🇳',
    requiredEducation: 'Class 10 ➔ Intermediate (MPC) ➔ NDA Entrance Exam or CDS Exam after Graduation ➔ SSB Interview ➔ Academy Training (NDA / IMA / AFA / INA)',
    futureScope: 'High-honor military career with leadership progression, operational command, defense technology, and civil re-settlement options.',
    duration: '3 Years (NDA) + 1 Year (Military Academy)',
    skills: [
      'Military Command & Leadership',
      'Tactical Strategy & Physical Endurance',
      'Weapon Systems & Navigation',
      'Crisis Response & Decision Making',
      'Team Synergy & High Discipline',
    ],
    programmingLanguages: ['C++ / Python (for Cyber & Signals Corps)'],
    frameworks: ['Defence Standard Operating Procedures (SOPs)'],
    tools: ['Radar Systems', 'Defense Communication Equipment', 'Tactical Navigation Systems'],
    databases: ['Military Logistics & Intelligence Networks'],
    cloudTechnologies: ['Secure Defence Networks'],
    certifications: [
      'Commissioned Officer Parchment from President of India',
      'Specialized Military Operational Badges',
    ],
    topCompanies: ['Indian Army', 'Indian Navy', 'Indian Air Force', 'DRDO', 'HAL', 'Defence Public Sector Undertakings'],
    learningResources: [
      { title: 'Join Indian Army Official Portal', url: 'https://joinindianarmy.nic.in' },
      { title: 'Join Indian Air Force Official Portal', url: 'https://afcat.cdac.in' },
    ],
    books: [
      'Pathfinder for NDA & NA Entrance Examination',
      'SSB Interview: The Complete Guide by Dr. N.K. Natarajan',
      'Kargil: From Surprise to Victory by General V.P. Malik',
    ],
    videos: [
      { title: 'NDA & CDS Entrance Written Exam Preparation', url: 'https://youtube.com' },
      { title: 'SSB 5-Day Interview Process & Officer Like Qualities (OLQs)', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'defence-prep-materials (Open physical and written prep guides)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Develop Officer Like Qualities (OLQs): courage, decision-making, stamina, and team spirit.',
      'Prepare for 5-Day Service Selection Board (SSB) tests including screening, psychology, GTO obstacles, and personal interview.',
    ],
    resumeTips: [
      'Highlight NCC cadet certifications (C-Certificate), sports achievements, and physical fitness records.',
    ],
    projects: [
      'Leadership Role in College NCC / Civil Defence Brigade',
    ],
    careerGrowth: [
      'Lieutenant / Flying Officer / Sub Lieutenant ➔ Captain / Flight Lieutenant ➔ Major / Wing Commander ➔ Lieutenant Colonel / Group Captain ➔ Colonel ➔ Brigadier ➔ General / Admiral / Air Chief Marshal',
    ],
    industryTrends: ['Unmanned Aerial Vehicles (Drones)', 'Cyber Warfare & Space Command', 'Indigenization of Defence Equipment (Make in India)'],
    aiImpact: 'AI enhances surveillance, drone swarms, and radar intelligence, while tactical command remains in human officer hands.',
    advantages: ['Highest patriotism, pride, and societal honor', 'Comprehensive medical, housing, and pension benefits for family', 'Unrivaled adventure & physical fitness'],
    challenges: ['Rigorous physical demands & tough postings', 'Risk associated with active defense duties'],
    faqs: [
      {
        question: 'Can girls join the Defence Forces through NDA?',
        answer: 'Yes! Female candidates can write the NDA entrance exam for entry into Indian Army, Navy, and Air Force academies.',
      },
    ],
    relatedCareers: ['civil-services-ias', 'commercial-pilot'],
  },

  {
    slug: 'commercial-pilot',
    title: 'Commercial Airline Pilot',
    category: 'Aviation & Hospitality',
    icon: '✈️',
    educationLevels: ['Class 8-10', 'Intermediate', 'Graduation'],
    streams: ['MPC', 'Science & Maths', 'Engineering'],
    overview: 'Commercial Pilots operate passenger airlines, cargo jets, and private aircraft, ensuring safe global flight operations.',
    description: 'Fly commercial airliners, perform pre-flight instrument checks, navigate international airspace, and manage flight crew operations safely.',
    salary: '₹15 - 50 LPA (Co-Pilot) | ₹60 LPA - ₹1.2 Cr+ (Senior Captain)',
    salaryRange: { india: '₹15 - 60 LPA+', abroad: '$100,000 - $250,000+' },
    demand: 'Very High Demand ✈️',
    requiredEducation: 'Class 10 ➔ Intermediate (MPC with 50%+ in Physics & Maths) ➔ DGCA Class 1 Medical ➔ Flying School ➔ Commercial Pilot License (CPL) + Type Rating',
    futureScope: 'Rapid expanding aviation sector in India and globally with thousands of new aircraft orders.',
    duration: '1.5 - 2 Years (Flying Training)',
    skills: [
      'Aviation Navigation & Meteorology',
      'Cockpit Aircraft Flight Controls & Avionics',
      'Quick Reflexes & High Spatial Awareness',
      'Emergency Management & Crew Resource Management (CRM)',
    ],
    programmingLanguages: ['N/A (Aviation & Avionics Domain)'],
    frameworks: ['DGCA Regulations', 'ICAO Flight Safety Standards'],
    tools: ['Flight Simulators (Airbus A320 / Boeing 737)', 'Altimeter & Radar Avionics', 'Jeppesen Flight Maps'],
    databases: ['Aviation Weather Databases (METAR / TAF)', 'Flight Route Systems'],
    cloudTechnologies: ['Electronic Flight Bag (EFB) Cloud Systems'],
    certifications: [
      'Commercial Pilot License (CPL) issued by DGCA',
      'Instrument Rating (IR) & Multi-Engine Rating (MER)',
      'Type Rating (Airbus A320 / Boeing 737 MAX)',
    ],
    topCompanies: ['IndiGo', 'Air India', 'Akasa Air', 'Emirates', 'Qatar Airways', 'Etihad', 'Singapore Airlines'],
    learningResources: [
      { title: 'DGCA India Official Aviation Portal', url: 'https://dgca.gov.in' },
      { title: 'FAA Aviation Flying Handbooks', url: 'https://faa.gov' },
    ],
    books: [
      'Air Navigation by R.K. Bali',
      'Meteorology for Pilots by Mike Wickson',
      'Radio Communication & Technical General by Capt. H. Puri',
    ],
    videos: [
      { title: 'Commercial Pilot Training Path & Flying School Selection', url: 'https://youtube.com' },
      { title: 'Cockpit Airbus A320 Flight Instrument Explanation', url: 'https://youtube.com' },
    ],
    githubRepos: [
      { title: 'open-flight-sim (Open aviation navigation tools)', url: 'https://github.com' },
    ],
    interviewPrep: [
      'Pass DGCA written theory exams in Air Navigation, Aviation Meteorology, Air Regulations, and Technical General.',
      'Prepare simulator flying assessments and airline pilot competency interviews.',
    ],
    resumeTips: [
      'Highlight total flying hours logged (minimum 200 hours CPL), type rating certifications, and DGCA medical validity.',
    ],
    projects: [
      '200+ Flying Hours Logging on Cessna 172 / Diamond DA42 Trainer Aircraft',
    ],
    careerGrowth: [
      'Junior First Officer (Co-Pilot) ➔ Senior First Officer ➔ Airline Captain (Commander) ➔ Check Pilot / Designated Examiner / Chief Pilot',
    ],
    industryTrends: ['Electric Vertical Takeoff Aircraft (eVTOL)', 'Advanced Fly-by-Wire Avionics', 'Sustainable Aviation Fuel'],
    aiImpact: 'AI improves autopilot efficiency and flight route optimization, but pilot command remains indispensable for flight safety.',
    advantages: ['High salary and luxurious lifestyle', 'Travel the world and experience flight freedom', 'Prestigious uniform profession'],
    challenges: ['High upfront training cost (₹40 - 60 Lakhs)', 'Strict medical fitness evaluations every year'],
    faqs: [
      {
        question: 'Is Physics and Maths mandatory in 12th for Pilot entry?',
        answer: 'Yes, Physics and Mathematics are required by DGCA. Students without MPC can complete them via NIOS board exams.',
      },
    ],
    relatedCareers: ['defence-officer', 'software-engineer'],
  },
];

// Helper to filter careers based on education level, stream, interest category, and search query
export const getFilteredCareers = ({ education, stream, interest, category, search }) => {
  return CAREERS_DATA.filter((career) => {
    // 1. Education Stage Filter
    if (education && education !== 'All') {
      const matchEdu = career.educationLevels.some(
        (lvl) => lvl.toLowerCase() === education.toLowerCase() || lvl === 'All'
      );
      if (!matchEdu) return false;
    }

    // 2. Stream Filter
    if (stream && stream !== 'All') {
      if (career.streams && career.streams.length > 0) {
        const matchStream = career.streams.some(
          (s) => s.toLowerCase().includes(stream.toLowerCase()) || stream.toLowerCase().includes(s.toLowerCase())
        );
        if (!matchStream) return false;
      }
    }

    // 3. Interest / Category Filter
    const targetCategory = category || interest;
    if (targetCategory && targetCategory !== 'All') {
      const matchCat =
        career.category.toLowerCase() === targetCategory.toLowerCase() ||
        career.category.toLowerCase().includes(targetCategory.toLowerCase());
      if (!matchCat) return false;
    }

    // 4. Keyword Search
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      const matchSearch =
        career.title.toLowerCase().includes(q) ||
        career.overview.toLowerCase().includes(q) ||
        career.description.toLowerCase().includes(q) ||
        career.category.toLowerCase().includes(q) ||
        career.skills.some((sk) => sk.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    return true;
  });
};

// Helper to calculate dynamic roadmap steps tailored for (Education, Stream, Career)
export const generateDynamicRoadmap = (career, userEducation = 'Class 8-10', userStream = 'MPC') => {
  if (!career) return [];

  const edu = userEducation || 'Class 8-10';
  const str = userStream || 'MPC';

  // Base tailored steps structure
  if (career.slug === 'software-engineer' || career.category === 'Technology') {
    return [
      {
        step: 1,
        title: `${edu} Fundamentals & Problem Solving`,
        description: `Build core analytical thinking, Mathematics, and Computer Science basics tailored for your current level (${edu}).`,
        subjects: ['Mathematics (Algebra & Logic)', 'Computer Fundamentals & HTML', 'Algorithm Basics'],
        videos: [
          { title: 'CS50: Introduction to Computer Science (Harvard)', url: 'https://youtube.com' },
          { title: 'Logic & Problem Solving Fundamentals', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'FreeCodeCamp Interactive Coding', url: 'https://freecodecamp.org' },
          { title: 'Khan Academy Computer Science', url: 'https://khanacademy.org' },
        ],
        tips: ['Focus on building logical problem-solving intuition.', 'Practice coding 30 minutes daily.'],
        books: ['Head First Programming', 'NCERT Mathematics & Logic'],
        status: 'Current',
      },
      {
        step: 2,
        title: `Choose Stream & Specialization (${str})`,
        description: `Focus on ${str} stream subjects to establish strong engineering eligibility and quantitative aptitude.`,
        subjects: ['Calculus & Coordinate Geometry', 'Physics & Computational Thinking', 'Python / JavaScript Programming'],
        videos: [
          { title: 'Python Programming Full Course for Beginners', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'GeeksforGeeks Programming Portal', url: 'https://geeksforgeeks.org' },
        ],
        tips: ['Master fundamental data structures early in Python or C++.'],
        books: ['Concepts of Physics by H.C. Verma', 'Data Structures in C/C++ by Tanenbaum'],
        status: 'Upcoming',
      },
      {
        step: 3,
        title: 'Entrance Exams & Degree Admission',
        description: 'Prepare for entrance exams (JEE Main, EAMCET, State CETs, or BCA/B.Sc Coding admissions).',
        subjects: ['Entrance Pattern Mock Exams', 'Speed & Accuracy Training', 'Physics & Maths Problem Sets'],
        videos: [
          { title: 'Engineering Entrance Strategy & Syllabus', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'NTA Abhyas Official Mock Tests', url: 'https://nta.ac.in' },
        ],
        tips: ['Solve past 5 years of entrance examination papers.'],
        books: ['JEE Main Chapterwise Solved Papers'],
        status: 'Upcoming',
      },
      {
        step: 4,
        title: 'Graduation & Core Computer Science (B.Tech / BCA)',
        description: 'Master core CS curriculum: Data Structures & Algorithms, Web Engineering, DBMS, and OS.',
        subjects: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'Database Management (DBMS)', 'Web Engineering'],
        videos: [
          { title: 'Data Structures & Algorithms Course by Abdul Bari', url: 'https://youtube.com' },
          { title: 'Full Stack MERN Architecture Tutorial', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'LeetCode Algorithmic Practice Platform', url: 'https://leetcode.com' },
          { title: 'MDN Web Docs for Full Stack Web Dev', url: 'https://developer.mozilla.org' },
        ],
        tips: ['Build 2-3 production-ready web applications.', 'Maintain a clean GitHub portfolio.'],
        books: ['Introduction to Algorithms (CLRS)', 'Clean Code by Robert C. Martin'],
        status: 'Upcoming',
      },
      {
        step: 5,
        title: 'Internships, Portfolio & Placement',
        description: 'Apply for software engineering internships, contribute to open source, and crack tech interviews.',
        subjects: ['System Design Basics', 'LeetCode Medium Problem Solving', 'Behavioral STAR Interviews'],
        videos: [
          { title: 'System Design Interview Fundamentals', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'Tech Interview Handbook', url: 'https://techinterviewhandbook.org' },
        ],
        tips: ['Practice live mock technical interviews.', 'Tailor resume for specific developer roles.'],
        books: ['Cracking the Coding Interview by Gayle Laakmann McDowell'],
        status: 'Upcoming',
      },
    ];
  } else if (career.slug === 'doctor-mbbs' || career.category === 'Medicine') {
    return [
      {
        step: 1,
        title: `${edu} Science Fundamentals`,
        description: `Build strong fundamentals in Biology, Physics, and Chemistry starting from your current level (${edu}).`,
        subjects: ['Cell Biology & Genetics', 'Basic Chemistry & Equations', 'Human Physiology Basics'],
        videos: [{ title: 'Class 10 Biology Human Anatomy Fundamentals', url: 'https://youtube.com' }],
        resources: [{ title: 'Khan Academy Biology', url: 'https://khanacademy.org' }],
        tips: ['Focus on conceptual diagrams and NCERT textbook line-by-line reading.'],
        books: ['NCERT Science Class 9 & 10'],
        status: 'Current',
      },
      {
        step: 2,
        title: 'Intermediate BiPC Stream',
        description: 'Enroll in BiPC (Biology, Physics, Chemistry) in Class 11-12 as mandatory medical entrance qualification.',
        subjects: ['Botany & Zoology', 'Organic & Inorganic Chemistry', 'Physics (Mechanics & Optics)'],
        videos: [{ title: 'NEET Biology Line-by-Line NCERT Explanation', url: 'https://youtube.com' }],
        resources: [{ title: 'NTA Official NEET Syllabus', url: 'https://neet.nta.nic.in' }],
        tips: ['Revise NCERT Biology at least 5 times before NEET.'],
        books: ['NCERT Biology Class 11 & 12', 'Objective Biology by Trueman'],
        status: 'Upcoming',
      },
      {
        step: 3,
        title: 'NEET-UG Medical Entrance Examination',
        description: 'Appear for national NEET-UG entrance exam and secure merit rank for government or top medical colleges.',
        subjects: ['720 Marks NEET Mock Papers', 'Speed & Accuracy in Physics/Chemistry', 'Negative Marking Strategy'],
        videos: [{ title: 'NEET Past 10 Years Question Solving Masterclass', url: 'https://youtube.com' }],
        resources: [{ title: 'Embibe Free NEET Practice Tests', url: 'https://embibe.com' }],
        tips: ['Target 650+ score for top government medical college seats.'],
        books: ['34 Years NEET Chapterwise Solved Papers'],
        status: 'Upcoming',
      },
      {
        step: 4,
        title: 'MBBS Medical Degree & Clinical Training (5.5 Years)',
        description: 'Complete 4.5 years of academic medical subjects followed by 1 year of compulsory rotatory clinical internship.',
        subjects: ['Anatomy, Physiology & Biochemistry', 'Pathology & Pharmacology', 'General Medicine & Surgery'],
        videos: [{ title: 'Clinical Medical Case Examination & Rounds', url: 'https://youtube.com' }],
        resources: [{ title: 'PubMed Medical Literature Database', url: 'https://pubmed.ncbi.nlm.nih.gov' }],
        tips: ['Gain active hands-on clinical patient examination skills during hospital rounds.'],
        books: ['Harrison\'s Principles of Internal Medicine', 'Gray\'s Anatomy'],
        status: 'Upcoming',
      },
      {
        step: 5,
        title: 'Specialization (MD / MS) & Doctor Practice',
        description: 'Appear for NEET-PG / INI-CET to pursue 3-year MD/MS specialization in Surgery, Cardiology, Pediatrics, etc.',
        subjects: ['Surgical Procedures', 'Super Specialization Care', 'Independent Clinical Practice'],
        videos: [{ title: 'Surgical Procedures & Medical Specialization Overview', url: 'https://youtube.com' }],
        resources: [{ title: 'National Medical Commission Guidelines', url: 'https://nmc.org.in' }],
        tips: ['Obtain NMC registration to practice independently or join top hospitals.'],
        books: ['Robbins Pathologic Basis of Disease'],
        status: 'Upcoming',
      },
    ];
  }

  // Fallback for all other careers
  return [
    {
      step: 1,
      title: `${edu} Fundamental Foundation`,
      description: `Establish essential domain skills and subject basics starting from ${edu}.`,
      subjects: ['Core Domain Basics', 'Analytical Reasoning', 'Communication Skills'],
      videos: [{ title: 'Introduction to ' + career.title, url: 'https://youtube.com' }],
      resources: [{ title: 'Core Guidance & Learning Portal', url: 'https://google.com' }],
      tips: ['Build strong fundamentals and explore basic projects.'],
      books: ['NCERT & Domain Foundation Books'],
      status: 'Current',
    },
    {
      step: 2,
      title: `Choose Stream & Degree Path (${str})`,
      description: `Pursue ${str} stream and relevant degree qualification required for ${career.title}.`,
      subjects: ['Specialized Domain Subjects', 'Practical Skills', 'Certifications'],
      videos: [{ title: career.title + ' Career Guide', url: 'https://youtube.com' }],
      resources: [{ title: 'Official Certification & University Guides', url: 'https://google.com' }],
      tips: ['Master core industry skills and tools early.'],
      books: ['Standard Reference Handbooks'],
      status: 'Upcoming',
    },
    {
      step: 3,
      title: 'Entrance / Admission / Skill Certification',
      description: 'Clear relevant entrance exams, trade tests, or professional certifications.',
      subjects: ['Exam Pattern Practice', 'Industry Certifications'],
      videos: [{ title: 'Entrance & Skill Exam Prep', url: 'https://youtube.com' }],
      resources: [{ title: 'Practice Tests & Mock Papers', url: 'https://google.com' }],
      tips: ['Maintain high consistency in practice test scores.'],
      books: ['Solved Question Banks'],
      status: 'Upcoming',
    },
    {
      step: 4,
      title: 'Practical Internship & Portfolio Building',
      description: 'Build real-world projects, undertake internships, and gain hands-on domain experience.',
      subjects: ['Hands-on Projects', 'Industry Tools', 'Portfolio Development'],
      videos: [{ title: 'Building Portfolio for ' + career.title, url: 'https://youtube.com' }],
      resources: [{ title: 'Open Source & Industry Resources', url: 'https://github.com' }],
      tips: ['Document your work and showcase measurable results.'],
      books: ['Industry Best Practices Guide'],
      status: 'Upcoming',
    },
    {
      step: 5,
      title: 'Professional Placement & Career Growth',
      description: 'Prepare for interviews, apply to top hiring companies, and step into your career as a ' + career.title + '.',
      subjects: ['Interview Preparation', 'Resume Building', 'Networking'],
      videos: [{ title: 'Interview & Career Placement Guide', url: 'https://youtube.com' }],
      resources: [{ title: 'Job Portals & Professional Networking', url: 'https://linkedin.com' }],
      tips: ['Connect with mentors and industry experts on LinkedIn.'],
      books: ['Career Leadership Handbooks'],
      status: 'Upcoming',
    },
  ];
};
