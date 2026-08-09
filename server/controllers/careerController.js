const mongoose = require('mongoose');
const Career = require('../models/Career');

// Initial seed data covering all required categories with rich Step Details
const initialCareersData = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    icon: '💻',
    educationLevels: ['Class 8-10', 'Intermediate', 'Diploma', 'Degree', 'Working Professional', 'Other'],
    overview: 'Software Engineers design, develop, test, and maintain software applications that solve complex real-world problems for global industries.',
    description: 'Build web, mobile, and cloud software applications using modern programming languages and frameworks.',
    salary: '₹6 - 25 LPA',
    demand: 'Very High 🔥',
    skills: ['JavaScript / React', 'Python / Node.js', 'Data Structures & Algorithms', 'Git & Cloud Architecture'],
    topCompanies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro'],
    requiredEducation: 'B.Tech / B.E in CSE/IT, BCA, MCA, or relevant coding bootcamp certification.',
    futureScope: 'Exponential demand driven by Artificial Intelligence, Cloud Infrastructure, and global SaaS scaling.',
    duration: '4 Years',
    roadmapSteps: [
      {
        step: 1,
        title: 'Class 10 Basics & Logical Thinking',
        description: 'Build strong fundamentals in Mathematics, Science, and logical problem solving.',
        subjects: ['Mathematics (Algebra & Geometry)', 'Computer Basics & Algorithms', 'Physics & Logical Deduction'],
        videos: [
          { title: 'CS50: Introduction to Computer Science (Harvard)', url: 'https://youtube.com' },
          { title: 'Logic & Problem Solving Fundamentals', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'Khan Academy Computer Science', url: 'https://khanacademy.org' },
          { title: 'W3Schools Programming Basics', url: 'https://w3schools.com' },
        ],
        tips: [
          'Focus on developing mathematical intuition and analytical thinking.',
          'Start solving basic programming puzzles in Scratch or Python early.'
        ],
        books: ['NCERT Mathematics Class 10', 'Head First Programming by David Griffiths'],
        status: 'Current',
      },
      {
        step: 2,
        title: 'Choose Stream (PCM)',
        description: 'Opt for Physics, Chemistry, and Mathematics in Intermediate (11-12) to build engineering eligibility.',
        subjects: ['Mathematics (Calculus & Coordinate Geometry)', 'Physics (Mechanics & Electromagnetism)', 'Chemistry & Computer Science'],
        videos: [
          { title: 'Class 11/12 Maths & Calculus Overview', url: 'https://youtube.com' },
          { title: 'Python Programming for Beginners', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'GeeksforGeeks Python Tutorials', url: 'https://geeksforgeeks.org' },
          { title: 'NCERT Official E-Books', url: 'https://ncert.nic.in' },
        ],
        tips: [
          'Master Calculus and Coordinate Geometry as they form the foundation for algorithms.',
          'Pick up Python as your first text-based programming language.'
        ],
        books: ['Concepts of Physics by H.C. Verma', 'Mathematics for Class 11 & 12 by R.D. Sharma'],
        status: 'Upcoming',
      },
      {
        step: 3,
        title: 'Entrance Exams & Admissions',
        description: 'Prepare for entrance exams like JEE Main, EAMCET, or State CETs for college entry.',
        subjects: ['JEE Main Pattern Questions', 'Speed & Accuracy Training', 'Mock Exams & Time Management'],
        videos: [
          { title: 'JEE Main Preparation Strategy & Time Management', url: 'https://youtube.com' },
          { title: 'Important Problem Types for Engineering Entrance', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'NTA Abhyas Official Mock Tests', url: 'https://nta.ac.in' },
          { title: 'Embibe Free Practice Tests', url: 'https://embibe.com' },
        ],
        tips: [
          'Solve at least 5 years of past entrance exam papers.',
          'Focus on accuracy first before attempting to maximize speed.'
        ],
        books: ['43 Years JEE Main Chapterwise Solved Papers', 'Problems in General Physics by I.E. Irodov'],
        status: 'Upcoming',
      },
      {
        step: 4,
        title: 'Graduation (B.Tech / BCA)',
        description: 'Learn core Computer Science subjects: Data Structures, Algorithms, Databases, and Web Dev.',
        subjects: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'Database Management Systems (DBMS)', 'Operating Systems & Computer Networks'],
        videos: [
          { title: 'Data Structures & Algorithms Course by Abdul Bari', url: 'https://youtube.com' },
          { title: 'Full Stack Web Development MERN Stack Masterclass', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'LeetCode Problem Solving Platform', url: 'https://leetcode.com' },
          { title: 'MDN Web Docs for HTML/CSS/JavaScript', url: 'https://developer.mozilla.org' },
        ],
        tips: [
          'Solve 1-2 coding problems daily on LeetCode or HackerRank.',
          'Build real projects using React, Node.js, and MongoDB.'
        ],
        books: ['Introduction to Algorithms by Cormen (CLRS)', 'Operating System Concepts by Silberschatz'],
        status: 'Upcoming',
      },
      {
        step: 5,
        title: 'Build Projects & Internships',
        description: 'Develop full-stack applications, contribute to open source, and secure practical internships.',
        subjects: ['Git & GitHub Version Control', 'REST APIs & GraphQL', 'Cloud Deployment (AWS/Vercel/Docker)', 'System Design Basics'],
        videos: [
          { title: 'Git & GitHub Tutorial for Beginners', url: 'https://youtube.com' },
          { title: 'Deploying Full Stack MERN Apps to Cloud', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'GitHub Open Source First Timers Guide', url: 'https://github.com' },
          { title: 'AWS Free Tier Hands-on Labs', url: 'https://aws.amazon.com' },
        ],
        tips: [
          'Host 2-3 full-stack projects live on Vercel or Netlify with GitHub source code.',
          'Apply for off-campus internships via LinkedIn and Wellfound.'
        ],
        books: ['Designing Data-Intensive Applications by Martin Kleppmann', 'Clean Code by Robert C. Martin'],
        status: 'Upcoming',
      },
      {
        step: 6,
        title: 'Placement & Job Role',
        description: 'Prepare for technical interviews, practice behavioral questions, and secure a Software Engineer role.',
        subjects: ['Data Structures Speed Coding', 'System Design Interviews', 'Mock Technical Interviews', 'Resume & Portfolio Optimization'],
        videos: [
          { title: 'Cracking the Coding Interview Strategy Guide', url: 'https://youtube.com' },
          { title: 'System Design Interview for Beginners', url: 'https://youtube.com' },
        ],
        resources: [
          { title: 'InterviewBit Placement Preparation', url: 'https://interviewbit.com' },
          { title: 'Pramp Free Mock Interviews', url: 'https://pramp.com' },
        ],
        tips: [
          'Practice whiteboarding algorithms while explaining your thought process out loud.',
          'Tailor your resume highlights to quantify impact (e.g. improved speed by 40%).'
        ],
        books: ['Cracking the Coding Interview by Gayle Laakmann McDowell', 'System Design Interview by Alex Xu'],
        status: 'Upcoming',
      },
    ],
  },
  {
    slug: 'doctor-mbbs',
    title: 'Medical Doctor (MBBS)',
    category: 'Medicine',
    icon: '🩺',
    educationLevels: ['Class 8-10', 'Intermediate', 'Degree'],
    overview: 'Medical Doctors diagnose diseases, prescribe medical treatment, perform surgeries, and promote public health wellness.',
    description: 'Heal lives, research medical solutions, and build a fulfilling healthcare career in hospitals and clinics.',
    salary: '₹8 - 35 LPA',
    demand: 'Evergreen 🩺',
    skills: ['Clinical Diagnosis', 'Patient Care & Empathy', 'Medical Knowledge', 'Critical Emergency Response'],
    topCompanies: ['Apollo Hospitals', 'Fortis Healthcare', 'AIIMS', 'Max Healthcare', 'Manipal Hospitals'],
    requiredEducation: '10+2 with Physics, Chemistry, Biology (PCB) followed by clearing NEET-UG and completing 5.5 years MBBS.',
    futureScope: 'Constant nationwide and international demand across public and private health sectors.',
    duration: '5.5 Years',
    roadmapSteps: [
      {
        step: 1,
        title: 'Class 10 Foundation',
        description: 'Focus on Science, Biology, Chemistry, and foundational anatomy concepts.',
        subjects: ['Human Biology Basics', 'Chemistry & Periodic Table', 'Cellular Anatomy & Physiology'],
        videos: [{ title: 'Class 10 Biology Human Systems Explained', url: 'https://youtube.com' }],
        resources: [{ title: 'NCERT Biology Class 10 Interactive', url: 'https://ncert.nic.in' }],
        tips: ['Focus on diagrammatic representation of biological systems.', 'Understand organ functions.'],
        books: ['NCERT Science Class 10', 'S. Chand Biology Class 10'],
        status: 'Current',
      },
      {
        step: 2,
        title: 'BiPC Stream (11-12)',
        description: 'Study Biology, Physics, and Chemistry intensively for NEET preparation.',
        subjects: ['Botany & Zoology', 'Organic & Inorganic Chemistry', 'Physics Mechanics & Optics'],
        videos: [{ title: 'NEET Biology Complete Syllabus Review', url: 'https://youtube.com' }],
        resources: [{ title: 'NTA NEET Official Practice Portal', url: 'https://neet.nta.nic.in' }],
        tips: ['NCERT Biology is the bible for NEET - memorize line by line.', 'Solve daily MCQs.'],
        books: ['NCERT Biology Class 11 & 12', 'Objective Biology by Dr. Ali'],
        status: 'Upcoming',
      },
      {
        step: 3,
        title: 'NEET-UG Exam',
        description: 'Crack the national entrance exam for admission into government and private medical colleges.',
        subjects: ['Biology MCQs (360 Marks)', 'Chemistry MCQs (180 Marks)', 'Physics MCQs (180 Marks)'],
        videos: [{ title: 'NEET Exam Day Strategy & Time Allocation', url: 'https://youtube.com' }],
        resources: [{ title: 'Allen / Aakash Mock Test Series', url: 'https://aakash.ac.in' }],
        tips: ['Aim for 650+ marks to secure top government medical college seats.', 'Avoid negative marking.'],
        books: ['34 Years NEET Chapterwise Solved Papers'],
        status: 'Upcoming',
      },
      {
        step: 4,
        title: 'MBBS Degree',
        description: 'Complete 4.5 years of academic coursework covering Anatomy, Physiology, Pathology, and Pharmacology.',
        subjects: ['Anatomy & Physiology', 'Pathology & Pharmacology', 'Microbiology & Forensic Medicine', 'General Medicine & Surgery'],
        videos: [{ title: 'Marrow / PrepLadder MBBS Clinical Cases', url: 'https://marrow.com' }],
        resources: [{ title: 'PubMed Central Medical Research Library', url: 'https://ncbi.nlm.nih.gov' }],
        tips: ['Attend all clinical postings regularly to build diagnostic instincts.', 'Learn hospital protocols.'],
        books: ['Textbook of Medical Physiology by Guyton & Hall', 'Pathologic Basis of Disease by Robbins'],
        status: 'Upcoming',
      },
      {
        step: 5,
        title: 'Rotational Internship',
        description: 'Complete 1-year compulsory practical hospital internship across Emergency, Surgery, Pediatrics, and Gynaecology.',
        subjects: ['Emergency Triage', 'Surgical Assisting', 'Inpatient Ward Management', 'Basic Life Support (BLS)'],
        videos: [{ title: 'Clinical Internship Ward Management Guide', url: 'https://youtube.com' }],
        resources: [{ title: 'WHO Medical Treatment Guidelines', url: 'https://who.int' }],
        tips: ['Learn hands-on procedures like IV cannula insertion, suturing, and blood sampling.'],
        books: ['Oxford Handbook of Clinical Medicine'],
        status: 'Upcoming',
      },
      {
        step: 6,
        title: 'Specialization (MD/MS)',
        description: 'Optionally clear NEET-PG / INI-CET for specialization (Cardiology, Neurology, Surgery, Radiology).',
        subjects: ['NEET-PG Advanced Clinical MCQs', 'Specialty Residency', 'Research Thesis'],
        videos: [{ title: 'NEET-PG High Yield Topic Reviews', url: 'https://youtube.com' }],
        resources: [{ title: 'Marrow PG Question Bank', url: 'https://marrow.com' }],
        tips: ['Focus on clinical case integration questions.'],
        books: ['Harrison’s Principles of Internal Medicine', 'Bailey & Love’s Short Practice of Surgery'],
        status: 'Upcoming',
      },
    ],
  },
  {
    slug: 'chartered-accountant',
    title: 'Chartered Accountant (CA)',
    category: 'Commerce',
    icon: '📊',
    educationLevels: ['Class 8-10', 'Intermediate', 'Degree', 'Working Professional'],
    overview: 'Chartered Accountants manage corporate finances, perform statutory auditing, advise on taxation, and ensure legal compliance.',
    description: 'Strategic financial leadership for corporations, startups, audit firms, and government bodies.',
    salary: '₹8 - 28 LPA',
    demand: 'High Demand 💼',
    skills: ['Financial Accounting', 'Auditing Standards', 'Taxation & GST', 'Corporate Financial Strategy'],
    topCompanies: ['Deloitte', 'PwC', 'EY', 'KPMG', 'HDFC Bank', 'Reliance Industries'],
    requiredEducation: 'Pass CA Foundation, Intermediate, 3-Year Articleship, and CA Final exams conducted by ICAI.',
    futureScope: 'Essential strategic role in corporate governance, financial regulation, and startup expansion.',
    duration: '4-5 Years',
    roadmapSteps: [
      {
        step: 1,
        title: 'Class 10 Foundation',
        description: 'Develop strong numerical calculation, basic business, and analytical skills.',
        subjects: ['Mathematics & Statistics', 'Basic Economics', 'Commercial Arithmetic'],
        videos: [{ title: 'Foundations of Financial Literacy', url: 'https://youtube.com' }],
        resources: [{ title: 'ICAI Student Portal', url: 'https://icai.org' }],
        tips: ['Build strong fundamentals in mathematics and logical reasoning.'],
        books: ['NCERT Mathematics Class 10'],
        status: 'Current',
      },
      {
        step: 2,
        title: 'Commerce Stream (11-12)',
        description: 'Study Accountancy, Business Studies, Economics, and Financial Mathematics.',
        subjects: ['Financial Accounting', 'Business Studies & Management', 'Micro & Macro Economics'],
        videos: [{ title: 'Class 11 Accountancy Basics by T.S. Grewal', url: 'https://youtube.com' }],
        resources: [{ title: 'CBSE Academic E-Material', url: 'https://cbseacademic.nic.in' }],
        tips: ['Master double-entry bookkeeping rules inside out.'],
        books: ['Double Entry Book Keeping by T.S. Grewal', 'Microeconomics by Sandeep Garg'],
        status: 'Upcoming',
      },
      {
        step: 3,
        title: 'CA Foundation',
        description: 'Clear the entry-level examination held by ICAI (4 Papers).',
        subjects: ['Principles of Accounting', 'Business Laws & Communication', 'Business Mathematics & Logical Reasoning', 'Business Economics'],
        videos: [{ title: 'CA Foundation Preparation Strategy', url: 'https://youtube.com' }],
        resources: [{ title: 'ICAI Bos Knowledge Portal', url: 'https://icai.org' }],
        tips: ['Practice writing clear legal definitions for Business Laws.'],
        books: ['ICAI Official Study Material Foundation'],
        status: 'Upcoming',
      },
      {
        step: 4,
        title: 'CA Intermediate',
        description: 'Pass Group 1 & Group 2 examinations covering Advanced Accounts, Corporate Laws, Tax, and Auditing.',
        subjects: ['Advanced Accounting', 'Corporate & Other Laws', 'Direct & Indirect Taxation', 'Auditing & Ethics'],
        videos: [{ title: 'CA Intermediate Direct Tax Lectures', url: 'https://youtube.com' }],
        resources: [{ title: 'ICAI Revision Test Papers (RTP)', url: 'https://icai.org' }],
        tips: ['Attempt ICAI RTPs and Mock Test Papers before the final exam.'],
        books: ['ICAI Study Material Intermediate', 'Direct Taxes by V.K. Singhania'],
        status: 'Upcoming',
      },
      {
        step: 5,
        title: '3-Year Articleship',
        description: 'Gain compulsory real-world practical auditing and tax filing experience under a practicing CA.',
        subjects: ['Statutory Auditing', 'Income Tax Return Filing', 'GST Compliance & Filing', 'Company Law Filings'],
        videos: [{ title: 'Practical Articleship Training Guide', url: 'https://youtube.com' }],
        resources: [{ title: 'Income Tax Official e-Filing Portal', url: 'https://incometax.gov.in' }],
        tips: ['Work on diverse clients (manufacturing, service, banking) to gain maximum exposure.'],
        books: ['Practical Guide to Auditing by B.N. Tandon'],
        status: 'Upcoming',
      },
      {
        step: 6,
        title: 'CA Final & Certification',
        description: 'Clear CA Final examination and register as a certified Chartered Accountant.',
        subjects: ['Financial Reporting', 'Strategic Financial Management', 'Advanced Auditing', 'Strategic Cost Management'],
        videos: [{ title: 'CA Final Rank Holder Strategy', url: 'https://youtube.com' }],
        resources: [{ title: 'ICAI Registered CA Portal', url: 'https://icai.org' }],
        tips: ['Maintain consistency in revision during your final articleship year.'],
        books: ['ICAI CA Final Official Modules'],
        status: 'Upcoming',
      },
    ],
  },
];

// Helper to seed database if empty or re-seed if force
const autoSeedCareers = async (force = false) => {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const count = await Career.countDocuments();
    if (count === 0 || force) {
      if (force) await Career.deleteMany({});
      await Career.insertMany(initialCareersData);
      console.log('Successfully seeded MongoDB with rich career dataset! 🌱');
    }
  } catch (err) {
    console.error('Error auto-seeding careers collection:', err.message);
  }
};

/**
 * @desc    Get all careers with filtering & search
 * @route   GET /api/careers
 * @access  Public
 */
const getCareers = async (req, res) => {
  try {
    const { education, category, search } = req.query;
    let careers = [];
    let fetchedFromDB = false;

    if (mongoose.connection.readyState === 1) {
      try {
        await autoSeedCareers();
        const query = {};

        if (category && category !== 'All') {
          query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { overview: { $regex: search, $options: 'i' } },
            { skills: { $in: [new RegExp(search, 'i')] } },
          ];
        }

        careers = await Career.find(query).sort({ createdAt: -1 });
        fetchedFromDB = true;
      } catch (dbErr) {
        console.warn('MongoDB query warning, using fallback dataset:', dbErr.message);
      }
    }

    if (!fetchedFromDB) {
      // In-memory fallback if local MongoDB server is not running
      careers = [...initialCareersData];
      if (category && category !== 'All') {
        careers = careers.filter((c) => c.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const s = search.toLowerCase();
        careers = careers.filter(
          (c) =>
            c.title.toLowerCase().includes(s) ||
            c.description.toLowerCase().includes(s) ||
            c.overview.toLowerCase().includes(s)
        );
      }
    }

    if (education && education.toLowerCase() !== 'all' && education.trim() !== '') {
      careers = careers.filter((c) =>
        Array.isArray(c.educationLevels)
          ? c.educationLevels.some((el) => el.toLowerCase().includes(education.toLowerCase()))
          : true
      );
    }

    return res.status(200).json({
      success: true,
      count: careers.length,
      careers,
    });
  } catch (error) {
    console.error('Get Careers Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

/**
 * @desc    Get single career details by ID or Slug
 * @route   GET /api/careers/:id
 * @access  Public
 */
const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;

    let career;
    if (mongoose.connection.readyState === 1) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        career = await Career.findById(id);
      }
      if (!career) {
        career = await Career.findOne({ slug: id.toLowerCase() });
      }
    } else {
      career = initialCareersData.find(
        (c) => c.slug.toLowerCase() === id.toLowerCase() || c._id === id
      );
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found.',
      });
    }

    return res.status(200).json({
      success: true,
      career,
    });
  } catch (error) {
    console.error('Get Single Career Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving career details.',
    });
  }
};

/**
 * @desc    Create new career path (CRUD)
 * @route   POST /api/careers
 * @access  Public / Admin
 */
const createCareer = async (req, res) => {
  try {
    const { title } = req.body;
    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const existing = await Career.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A career path with this slug already exists.',
      });
    }

    const newCareer = await Career.create({
      ...req.body,
      slug,
    });

    return res.status(201).json({
      success: true,
      message: 'Career path created successfully!',
      career: newCareer,
    });
  } catch (error) {
    console.error('Create Career Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating career record.',
    });
  }
};

/**
 * @desc    Update an existing career path (CRUD)
 * @route   PUT /api/careers/:id
 * @access  Public / Admin
 */
const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;

    let career = await Career.findById(id);
    if (!career) {
      career = await Career.findOne({ slug: id.toLowerCase() });
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found to update.',
      });
    }

    const updatedCareer = await Career.findByIdAndUpdate(career._id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Career path updated successfully!',
      career: updatedCareer,
    });
  } catch (error) {
    console.error('Update Career Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error updating career record.',
    });
  }
};

/**
 * @desc    Delete a career path (CRUD)
 * @route   DELETE /api/careers/:id
 * @access  Public / Admin
 */
const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    let career = await Career.findById(id);
    if (!career) {
      career = await Career.findOne({ slug: id.toLowerCase() });
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: 'Career path not found to delete.',
      });
    }

    await Career.findByIdAndDelete(career._id);

    return res.status(200).json({
      success: true,
      message: 'Career path deleted successfully.',
    });
  } catch (error) {
    console.error('Delete Career Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error deleting career record.',
    });
  }
};

module.exports = {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
};
