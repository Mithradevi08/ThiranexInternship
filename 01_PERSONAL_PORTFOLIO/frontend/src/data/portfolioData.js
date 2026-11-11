export const portfolioData = {
  personal: {
    fullName: "Mithradevi Rajalingam",
    displayName: "Mithradevi R",
    title: "Aspiring Software Engineer",
    tagline: "B.E. Computer Science & Engineering Student | Full Stack & AI Enthusiast",
    bio: "I am a dedicated third-year Computer Science and Engineering student at Kongu Engineering College with a strong academic foundation (CGPA 8.63). Passionate about architecting scalable full-stack web applications, mastering Data Structures and Algorithms in Java, and exploring practical Artificial Intelligence solutions.",
    careerObjective: "Aspiring Software Engineer interested in Full Stack Development, Java Programming, Data Structures and Algorithms, and Artificial Intelligence. Dedicated to writing clean, maintainable code and building high-impact software solutions.",
    college: "Kongu Engineering College, Perundurai",
    degree: "B.E. Computer Science and Engineering",
    cgpa: "8.63 (up to 4th semester)",
    email: "mithradevi.contact@example.com", // Editable placeholder
    github: "https://github.com/mithradevir",
    linkedin: "https://linkedin.com/in/mithradevi-rajalingam",
    location: "Perundurai, Erode, Tamil Nadu, India",
    languages: ["Tamil", "English"],
    interests: ["Reading books (Favourite: Agni Siragugal)", "Listening to music"],
    favLanguage: "Java"
  },

  education: [
    {
      institution: "Kongu Engineering College, Perundurai",
      degree: "B.E. Computer Science and Engineering",
      score: "CGPA: 8.63 (up to 4th semester)",
      period: "2023 – 2027",
      status: "Currently in 3rd Year",
      highlights: [
        "Consistent academic excellence with top performance in core computer science subjects.",
        "Active member of departmental technical coding and development clubs.",
        "Recipient of Academic Excellence Award (2024)."
      ]
    },
    {
      institution: "Government Girls Higher Secondary School, Perundurai",
      degree: "Higher Secondary Certificate (HSC)",
      score: "94.8%",
      period: "2022 – 2023",
      status: "Completed",
      highlights: [
        "Graduated with exceptional honors in Mathematics, Physics, Chemistry, and Computer Science.",
        "School-level academic topper."
      ]
    },
    {
      institution: "Government High School, Naganallur",
      degree: "Secondary School Leaving Certificate (SSLC)",
      score: "94.2%",
      period: "2020 – 2021",
      status: "Completed",
      highlights: [
        "Strong foundation in mathematics and science with outstanding academic record."
      ]
    }
  ],

  skillCategories: [
    {
      name: "Programming Languages",
      skills: [
        { name: "Java", level: "Advanced (Favorite)", proficiency: 92 },
        { name: "Python", level: "Proficient", proficiency: 88 },
        { name: "C++", level: "Proficient", proficiency: 85 },
        { name: "C", level: "Proficient", proficiency: 82 },
        { name: "JavaScript", level: "Proficient", proficiency: 87 }
      ]
    },
    {
      name: "Frontend Development",
      skills: [
        { name: "React.js", level: "Proficient", proficiency: 88 },
        { name: "HTML5 & CSS3", level: "Advanced", proficiency: 94 },
        { name: "Responsive UI Design", level: "Advanced", proficiency: 90 },
        { name: "Modern CSS & Flexbox/Grid", level: "Advanced", proficiency: 92 }
      ]
    },
    {
      name: "Backend & Database",
      skills: [
        { name: "Node.js", level: "Proficient", proficiency: 84 },
        { name: "Express.js", level: "Proficient", proficiency: 85 },
        { name: "MongoDB & Mongoose", level: "Proficient", proficiency: 86 },
        { name: "MySQL", level: "Proficient", proficiency: 82 },
        { name: "RESTful API Architecture", level: "Proficient", proficiency: 88 }
      ]
    },
    {
      name: "Core CS & Additional Tools",
      skills: [
        { name: "Data Structures & Algorithms", level: "Proficient", proficiency: 88 },
        { name: "Object-Oriented Programming (OOP)", level: "Advanced", proficiency: 92 },
        { name: "Database Management Systems (DBMS)", level: "Proficient", proficiency: 85 },
        { name: "Operating Systems", level: "Proficient", proficiency: 82 },
        { name: "Git & GitHub", level: "Proficient", proficiency: 86 },
        { name: "Flutter & Figma", level: "Intermediate", proficiency: 75 },
        { name: "VS Code, Jupyter, Colab", level: "Advanced", proficiency: 90 }
      ]
    }
  ],

  projects: [
    {
      id: "shopeasy",
      title: "ShopEasy – E-Commerce Web Application",
      category: "Full Stack MERN",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind/CSS3"],
      shortDesc: "A complete online shopping ecosystem with product filtering, dynamic cart, wishlist, address management, and checkout workflow.",
      problem: "Traditional small retailers lack an intuitive, responsive, and lightweight digital platform to showcase their inventory, handle customer orders, and track deliveries efficiently.",
      solution: "Engineered ShopEasy with a modern MERN stack architecture providing customers with instant search, category filtering, cart operations, demo/COD checkout, and an administrative control panel for product and order management.",
      features: [
        "Product catalog with real-time multi-category filtering and search.",
        "Synchronized shopping cart and persistent wishlist with one-click transitions.",
        "Secure customer registration, login, and profile address management.",
        "Demo and Cash-on-Delivery checkout flow with automated invoice generation.",
        "Admin dashboard for product CRUD and real-time order status tracking."
      ],
      github: "https://github.com/mithradevir/shopeasy-ecommerce",
      demo: "https://shopeasy-thiranex.vercel.app"
    },
    {
      id: "sarcasm-detection",
      title: "Sarcasm Detection Using Machine Learning",
      category: "Artificial Intelligence & NLP",
      techStack: ["Python", "BiLSTM", "TF-IDF", "Scikit-Learn", "Keras/TensorFlow", "Pandas"],
      shortDesc: "Natural Language Processing system using TF-IDF feature engineering and Bidirectional LSTM networks to accurately identify sarcasm in social texts.",
      problem: "Sarcasm is heavily nuanced and contextual, causing standard sentiment analysis pipelines to incorrectly classify sarcastic negative sentiments as positive praise.",
      solution: "Developed a deep learning model utilizing Bidirectional Long Short-Term Memory (BiLSTM) combined with TF-IDF n-gram vectorization to capture both backward and forward linguistic dependencies.",
      features: [
        "Comprehensive text pre-processing: tokenization, lemmatization, and emoji normalization.",
        "BiLSTM neural network capturing complex syntactic and contextual clues.",
        "TF-IDF feature weighting for identifying distinctive sarcastic n-grams.",
        "Achieved high classification accuracy on social media sentence benchmarks."
      ],
      github: "https://github.com/mithradevir/sarcasm-detection-ml",
      demo: "#"
    },
    {
      id: "capacity-connect",
      title: "Capacity Connect – Learning Management Portal",
      category: "Web & Education Portal",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      shortDesc: "A digital capacity building and learning management platform facilitating resource sharing, skill assessments, and collaborative learning.",
      problem: "Educational institutions and training cells require an organized centralized platform to distribute learning modules, track student progress, and organize workshops.",
      solution: "Built Capacity Connect as a responsive web platform that connects educators, mentors, and students with streamlined course modules, assignment tracking, and learning analytics.",
      features: [
        "Role-based access for students, instructors, and training coordinators.",
        "Modular course curriculum with digital resource libraries.",
        "Self-assessment quizzes and real-time progress indicators.",
        "Discussion forum and feedback mechanism for continuous learning."
      ],
      github: "https://github.com/mithradevir/capacity-connect",
      demo: "#"
    },
    {
      id: "iot-pest-detection",
      title: "AI-Powered IoT System for Paddy Field Protection",
      category: "IoT & Computer Vision",
      techStack: ["Python", "OpenCV", "YOLO / CNN", "Raspberry Pi / ESP32", "IoT Sensors"],
      shortDesc: "Intelligent agricultural surveillance system that detects bird and rat intrusions in paddy fields and triggers automated deterrent mechanisms.",
      problem: "Agricultural crop loss due to rodents and birds during the harvest season causes significant economic strain to paddy farmers, who lack automated 24/7 protection tools.",
      solution: "Created an autonomous edge-AI monitoring system integrating vision cameras with trained object detection models to spot pests in real time and trigger humane deterrent sounds and alarms.",
      features: [
        "Real-time object detection tuned specifically for birds and field rodents.",
        "Edge computing deployment optimized for low-power microcontroller hardware.",
        "Automated acoustic deterrent frequency triggering upon intrusion.",
        "Farmer alert notifications with incident snapshots."
      ],
      github: "https://github.com/mithradevir/iot-paddy-field-protection",
      demo: "#"
    }
  ],

  certifications: [
    {
      id: "ibm-ai",
      title: "IBM AI Fundamentals",
      issuer: "IBM",
      date: "2024",
      credentialUrl: "https://www.credly.com/organizations/ibm",
      category: "Artificial Intelligence",
      description: "Comprehensive foundation in Artificial Intelligence concepts, machine learning algorithms, deep neural networks, AI ethics, and business use cases.",
      skills: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Ethics in AI"]
    },
    {
      id: "infosys-cpp",
      title: "C++ Software Development",
      issuer: "Infosys Springboard",
      date: "2024",
      credentialUrl: "https://springboard.infosys.com",
      category: "Software Development",
      description: "In-depth mastery of Object-Oriented Programming (OOP) in C++, dynamic memory management, STL containers, templates, and enterprise software engineering principles.",
      skills: ["C++", "OOP", "STL Containers", "Memory Management", "Algorithms"]
    },
    {
      id: "nptel-cv",
      title: "Computer Vision Certification",
      issuer: "NPTEL – Indian Institute of Technology",
      date: "2024",
      credentialUrl: "https://nptel.ac.in",
      category: "Computer Vision",
      description: "Rigorous academic examination covering digital image processing, spatial filtering, feature extraction, edge detection, optical flow, and convolutional neural architectures.",
      skills: ["Computer Vision", "Digital Image Processing", "OpenCV", "Pattern Recognition"]
    },
    {
      id: "ibm-aiml",
      title: "IBM AI/ML Learning Credentials",
      issuer: "IBM",
      date: "2024",
      credentialUrl: "https://www.credly.com/organizations/ibm",
      category: "Machine Learning",
      description: "Verified hands-on coursework in supervised and unsupervised learning, model evaluation metrics, data preprocessing, and automated machine learning pipelines.",
      skills: ["Supervised Learning", "Model Evaluation", "Scikit-Learn", "Python Data Science"]
    }
  ],

  achievements: [
    {
      title: "Academic Excellence Award (2024)",
      organization: "Kongu Engineering College",
      description: "Honored with the college academic award in recognition of outstanding academic performance and maintaining a high CGPA (8.63) in B.E. Computer Science and Engineering."
    },
    {
      title: "Paper Presentation – Astronova 2026",
      organization: "Coimbatore Institute of Technology (CIT)",
      description: "Presented research paper at the national symposium Astronova on emerging innovations in computing and artificial intelligence architectures."
    },
    {
      title: "24-Hour Hackathon Finalist",
      organization: "Kongu Engineering College",
      description: "Engineered and deployed an end-to-end full stack prototype under intensive 24-hour time constraints, demonstrating rapid prototyping and collaborative problem-solving."
    },
    {
      title: "10-Day In-Plant Training",
      organization: "Mobitech Wireless Solution Pvt. Ltd.",
      description: "Completed intensive industrial training focused on IoT architectures, sensor telemetry, wireless communication protocols, and embedded software integration."
    }
  ]
};
