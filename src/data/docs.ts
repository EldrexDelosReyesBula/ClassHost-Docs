export interface DocArticle {
  slug: string; // e.g. "guides/getting-started/what-is-classhost"
  title: string;
  description: string;
  category: string;
  categorySlug: string; // e.g. "getting-started"
  section: "guides" | "legal" | "safety" | "transparency" | "limitations" | "help" | "filipino";
  content: string;
  lastUpdated: string;
  order?: number;
  translation?: string;
}

export interface DocCategory {
  slug: string;
  title: string;
  description: string;
  section: "guides" | "legal" | "safety" | "transparency" | "limitations" | "help" | "filipino";
  icon: string;
}

export const CATEGORIES: DocCategory[] = [
  { slug: "getting-started", title: "Getting Started", description: "Learn what ClassHost is and set up your account.", section: "guides", icon: "rocket" },
  { slug: "deploying", title: "Deploying Projects", description: "Publish your HTML, ZIPs, or GitHub repos in seconds.", section: "guides", icon: "upload" },
  { slug: "managing-projects", title: "Managing Projects", description: "Configure visibility, visibility, and remixing.", section: "guides", icon: "settings" },
  { slug: "classrooms", title: "Classrooms (Students)", description: "Join classes, submit assignments, and view grades.", section: "guides", icon: "graduation" },
  { slug: "teaching", title: "Teaching (Educators)", description: "Create activities, manage rosters, and export grades.", section: "guides", icon: "school" },
  { slug: "legal", title: "Legal & Compliance", description: "Read our privacy policy, terms, and DPA agreements.", section: "legal", icon: "shield" },
  { slug: "safety", title: "Safety & Moderation", description: "How we protect student safety and review contents.", section: "safety", icon: "heart" },
  { slug: "transparency", title: "Transparency", description: "Understand how ClassHost works and what we log.", section: "transparency", icon: "info" },
  { slug: "limitations", title: "Platform Limitations", description: "Honest limits regarding sizes, types, and browsers.", section: "limitations", icon: "alert" },
  { slug: "filipino", title: "Filipino (Tagalog)", description: "Mga gabay at patakaran sa wikang Filipino.", section: "filipino", icon: "flag" }
];

export const ARTICLES: DocArticle[] = [
  {
    slug: "guides/getting-started/what-is-classhost",
    title: "What is ClassHost?",
    description: "A high-level overview of the ClassHost static publishing platform for classrooms.",
    category: "Getting Started",
    categorySlug: "getting-started",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 1,
    translation: "filipino/mga-gabay/ano-ang-classhost",
    content: `# What is ClassHost?

ClassHost is a static-first, zero-server publishing platform specifically designed for Philippine classrooms. It provides a bridge between learning HTML/CSS locally and seeing your work live on the internet.

---

## The Main Concept

Students write code on their devices, package their files (or link their GitHub account), and ClassHost publishes the site directly to GitHub Pages. ClassHost doesn't store your code on its servers. Instead, it interacts directly with the **GitHub REST API** to host all projects under the student's personal GitHub account.

---

## Key Features

- **No Git Knowledge Required:** Students deploy sites through a web dashboard without using command-line Git.
- **Remix Ecosystem:** Students can clone and modify public templates or classmate submissions (remix chain attribution is preserved).
- **Classroom Submissions:** Integrated student rosters, activity submissions, and grading tools for teachers.
- **Zero Hosting Fees:** Uses GitHub's free Pages tier for hosting.

---

## How It Helps Students

1. **Visual Accomplishment:** Instantly see your portfolio, game, or project live.
2. **Industry Skills:** Introduces students to version control concepts (commits, branches, repositories) in a friendly way.
3. **Attribution Awareness:** Teaches open-source etiquette by crediting original creators during code remixing.`
  },
  {
    slug: "guides/deploying/upload-zip",
    title: "Deploy from ZIP File",
    description: "Learn how to package your website into a ZIP file and deploy it live.",
    category: "Deploying Projects",
    categorySlug: "deploying",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 1,
    translation: "filipino/mga-gabay/upload-zip",
    content: `# How to Deploy Your Website from a ZIP File

**Time needed:** About 2-5 minutes  
**What you need:** A ZIP file containing your website (\`index.html\` + assets)

---

## Before You Start

- Make sure your ZIP file contains an \`index.html\` file at the root level.
- Maximum file size: **10 MB**.
- Do not put all files inside a single parent subfolder in the ZIP.

---

## Step-by-Step Guide

### Step 1: Sign In
Go to [classhost.app](https://classhost.app) and sign in using your connected account.

### Step 2: Select Your ZIP File
On the **Deploy** page, tap the **Upload ZIP file** card or drag and drop your ZIP archive into the upload zone.

### Step 3: Review Files
ClassHost will list the files found inside your archive. It checks for critical assets:
- **index.html** (Required)
- Stylesheets (.css)
- Scripts (.js)
- Images (.png, .jpg)

### Step 4: Deploy & Wait
Select your visibility (Public, Unlisted, or Private) and click **Deploy**. ClassHost will configure your GitHub Pages site. The first activation takes about **1 to 3 minutes** for GitHub's CDNs to propagate.

---

## Troubleshooting

### My site returns a 404 error
Wait 2 minutes and refresh. This is normal for initial GitHub Pages setup.

### Project is missing index.html
Open your ZIP folder. Ensure \`index.html\` is in the root of the ZIP file, not nested inside another folder.`
  },
  {
    slug: "guides/deploying/import-from-github",
    title: "Import from GitHub Repository",
    description: "Learn how to deploy an existing GitHub repository directly to ClassHost.",
    category: "Deploying Projects",
    categorySlug: "deploying",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 3,
    content: `# Import from GitHub Repository

If you already have a repository on GitHub containing a static site, you can import and host it using ClassHost without re-uploading files.

---

## Supported Scenarios

### Scenario A: Pages is Not Configured
ClassHost will call the GitHub API to enable GitHub Pages on your repository automatically, set it to the default branch (e.g., \`main\`), and poll until the URL is live.

### Scenario B: Pages is Already Active
ClassHost reads your existing Pages URL and imports the project metadata directly. No configurations are modified.

### Scenario C: Framework Projects
If ClassHost detects a package file (like \`package.json\`), it will flag it as a framework project. You can choose to deploy from build folders like \`dist/\`, \`build/\`, or \`docs/\`.

---

## How to Import

1. On the **Deploy** page, click the **Import from GitHub** card.
2. Select the repository from your list.
3. ClassHost will run a static check on the repository structure.
4. Review visibility and fork settings (if it is a fork, you can choose to credit the parent).
5. Click **Import to ClassHost**.`
  },
  {
    slug: "guides/classrooms/join-classroom",
    title: "Join a Classroom",
    description: "Learn how to join your teacher's classroom and access activities.",
    category: "Classrooms (Students)",
    categorySlug: "classrooms",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 1,
    content: `# Join a Classroom

To submit assignments, participate in class galleries, and see your grades, you must join your teacher's classroom.

---

## Step-by-Step Instructions

1. **Get the Code:** Ask your instructor for the classroom code (e.g. \`CLASS-IT3A-WEBDEV\`).
2. **Navigate to Classroom:** Open the **Classroom** tab from the main navigation menu.
3. **Click Join Class:** Tap the **Join a Class** button.
4. **Enter Code:** Input the class code and submit.
5. **Approval:** If your teacher has approval gates enabled, your status will be listed as **Pending Approval** until approved by the teacher.`
  },
  {
    slug: "guides/teaching/create-classroom",
    title: "Create a Classroom",
    description: "Guidelines for educators to create classrooms and manage activities.",
    category: "Teaching (Educators)",
    categorySlug: "teaching",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 1,
    content: `# Create a Classroom

As an educator, ClassHost allows you to create private classroom spaces to track student submissions, grade portfolios, and share starting templates.

---

## How to Create

1. Go to the **Classroom** tab.
2. Click **Create Class**.
3. Fill in:
   - **Class Name:** e.g., Web Development 1
   - **Term:** e.g., 2nd Sem 2026
   - **Teacher Name:** e.g., Prof. Rivera
4. Submit to create the class. You will be given a unique **Class Code** (e.g., \`CLASS-WXYZ12\`). Share this code with your students.

---

## Creating Activities

Once your class is created, you can add activities with descriptions and due dates. Students can submit their deployed ClassHost URLs directly to these activities.`
  },
  {
    slug: "legal/privacy-policy",
    title: "Privacy Policy",
    description: "How ClassHost collects, uses, and protects your information.",
    category: "Legal & Compliance",
    categorySlug: "legal",
    section: "legal",
    lastUpdated: "2026-06-22",
    content: `# Privacy Policy

**Effective Date:** July 1, 2026  
**Last Updated:** June 22, 2026  
**Version:** 2.1

---

## Summary

We collect as little information as possible. We never sell your data. You control your information. This policy explains exactly what we do.

---

## 1. What We Collect

### When You Sign In with GitHub
- **GitHub username:** To create repositories for your website hosting.
- **GitHub avatar URL:** To show your profile picture.

### When You Sign In with Google
- **Name:** To set your display name.
- **Email address:** For account recovery and notifications.

---

## 2. What We Never Collect

- ❌ Your passwords (GitHub and Google handle authentication securely).
- ❌ Your location data or IP addresses.
- ❌ Your browsing history outside ClassHost.
- ❌ Your website files (they live on your own GitHub account!).

---

## 3. Philippine Data Privacy Act Compliance

ClassHost complies fully with the **Philippine Data Privacy Act (RA 10173)**. We respect your rights to access, export, correct, and delete your data.`
  },
  {
    slug: "legal/terms-of-service",
    title: "Terms of Service",
    description: "Rules and terms for using the ClassHost platform.",
    category: "Legal & Compliance",
    categorySlug: "legal",
    section: "legal",
    lastUpdated: "2026-06-22",
    content: `# Terms of Service

**Last Updated:** June 22, 2026

---

## 1. Rules of Conduct

ClassHost is an educational platform. By using this service, you agree not to upload:
- Pornographic or sexually explicit content.
- Harassing, threatening, or abusive content.
- Malware, phishing pages, or viruses.
- Plagiarized student submissions without credit.

---

## 2. Repository Ownership

All code deployed via ClassHost is committed to your personal GitHub account. You maintain full ownership of all intellectual property.`
  },
  {
    slug: "transparency/how-classhost-works",
    title: "How ClassHost Works",
    description: "A technical explanation of how ClassHost deploys your code using APIs.",
    category: "Transparency",
    categorySlug: "transparency",
    section: "transparency",
    lastUpdated: "2026-06-22",
    content: `# How ClassHost Works

We believe in complete transparency. ClassHost operates entirely in your browser as a static web application.

---

## The Lifecycle of a Deploy

1. **File Packaging:** When you upload files, ClassHost reads them into browser memory as Base64 trees.
2. **GitHub API Request:** Using your GitHub token, ClassHost makes an API call to create a repository or write changes.
3. **Commit Tree:** ClassHost pushes a multi-file commit tree directly to GitHub.
4. **Pages Setup:** ClassHost requests GitHub to activate GitHub Pages on the default branch.
5. **Propagation Check:** The browser polls your public \`github.io\` URL using lightweight fetch checks until it is active.

ClassHost has no backend databases holding your code — your sovereign data stays under your control.`
  },
  {
    slug: "limitations/what-classhost-cant-do",
    title: "What ClassHost Can't Do",
    description: "An honest breakdown of the limits of our static hosting model.",
    category: "Platform Limitations",
    categorySlug: "limitations",
    section: "limitations",
    lastUpdated: "2026-06-22",
    content: `# What ClassHost Can't Do

ClassHost is built for **static websites**. It is important to know what is not supported.

---

## Unsupported Features

- **No Database Backends:** You cannot run Node.js, PHP, Python, or Ruby servers.
- **No Private Data Storage:** Since Pages sites are public, do not upload secret APIs, passwords, or databases.
- **File Limits:** Max upload size is 10MB per ZIP file, governed by browser loading limits.
- **GitHub App Permissions:** Requires you to install our GitHub App so we can manage repository deployments.

For databases, you must use external client-side integrations (like Supabase, Firebase, or local storage).`
  },
  {
    slug: "filipino/mga-gabay/ano-ang-classhost",
    title: "Ano ang ClassHost? (Filipino)",
    description: "Paliwanag tungkol sa ClassHost sa wikang Filipino.",
    category: "Filipino (Tagalog)",
    categorySlug: "filipino",
    section: "filipino",
    lastUpdated: "2026-06-22",
    content: `# Ano ang ClassHost?

Ang ClassHost ay isang static-first publishing platform na ginawa para sa mga silid-aralan sa Pilipinas. Pinapadali nito ang pag-publish ng inyong gawaing HTML/CSS diretso sa internet.

---

## Paano ito gumagana?

Ipapadala ng ClassHost ang inyong mga website files sa inyong personal na **GitHub** account gamit ang API. Iho-host ito ng GitHub nang libre gamit ang **GitHub Pages**.`
  },
  {
    slug: "filipino/mga-gabay/upload-zip",
    title: "Mag-deploy mula sa ZIP (Filipino)",
    description: "Gabay sa pag-upload at pag-deploy gamit ang ZIP file sa Filipino.",
    category: "Filipino (Tagalog)",
    categorySlug: "filipino",
    section: "filipino",
    lastUpdated: "2026-06-22",
    content: `# Mag-deploy mula sa ZIP File

**Oras na kailangan:** 2-5 minuto  
**Mga kailangan:** Isang ZIP file na may \`index.html\`

---

## Mga Hakbang

1. **Mag-sign In:** Pumunta sa classhost.app at mag-log in.
2. **I-upload ang ZIP:** I-drag o i-select ang inyong ZIP file.
3. **I-review ang Files:** Siguraduhing may \`index.html\` sa root level ng ZIP.
4. **I-deploy:** I-click ang **Deploy** button. Mag-antay ng 1-3 minuto para maging live.`
  }
];
