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

ClassHost is an education-first, zero-server publishing platform specifically designed for Philippine classrooms. It bridges the gap between learning to write HTML, CSS, and JavaScript locally on a computer or mobile phone, and seeing that code live on the global internet.

ClassHost is not a hosting provider, a commercial site builder, or a portfolio engine. It is an educational utility designed to grant students immediate access to the World Wide Web with full data sovereignty.

---

## The Zero-Server Model

Unlike traditional web builders that store your files on their proprietary servers, **ClassHost operates completely client-side**. It functions as an orchestration layer between you and GitHub.

When you upload a project or remix a classmate's code:
1. ClassHost reads and packages your code in your browser memory.
2. It interacts directly with the **GitHub REST API** using your credentials.
3. It creates a repository, commits your files, and triggers **GitHub Pages** hosting under your own GitHub account.

This architecture ensures that your code belongs entirely to you. Even if ClassHost is turned off or ceases to exist, your websites remain live and fully accessible on your personal GitHub profile.

---

## Core Pillars & Principles

### 1. Zero git-terminal Friction
Traditional Git version control requires command-line knowledge, SSH key configurations, and terminal workflows. For students who have never programmed before—or who are using school computer labs with restricted terminal access—this is a massive blocker. ClassHost automates the version control pipeline entirely within a friendly web dashboard.

### 2. Full Data Sovereignty
Students maintain absolute ownership of their digital creations. No vendor lock-in. Your files live in your repositories, under your username.

### 3. Open-Source Remixing
We teach students that code is shared. Every public project on ClassHost can be "remixed" (cloned) with a single tap. ClassHost automatically tracks and displays the remix lineage (e.g., *Remixed from Juan, who remixed from Maria*), fostering academic honesty and open-source collaboration.

### 4. Classroom Optimization
Integrated tools for teachers allow them to create virtual classrooms, publish activities with deadlines, track student portfolios, preview live student sites side-by-side with code, and submit grades.

---

> [!NOTE]
> ClassHost is built to support static web development. This includes HTML5, CSS3, client-side Javascript, and front-end frameworks (React, Vue, Vite builds, etc.). It does not support server-side languages like Node.js backends, PHP, Python, or MySQL databases.`
  },
  {
    slug: "guides/getting-started/account-setup",
    title: "Account Setup & Permissions",
    description: "How to connect your GitHub and Google accounts, and install the ClassHost GitHub App.",
    category: "Getting Started",
    categorySlug: "getting-started",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 2,
    content: `# Account Setup & Permissions

To deploy websites, track your assignments, and participate in classroom activities, you need to set up your ClassHost account. This guide explains how ClassHost connects to third-party services and why specific permissions are required.

---

## Authentication Methods

ClassHost supports two primary sign-in methods:

### Sign In with Google
*   **Best for:** Students who only need to join classrooms, view grades, or submit local ZIP files.
*   **Information accessed:** ClassHost requests access to your basic profile (Name, email address, and avatar).

### Sign In with GitHub (Recommended)
*   **Best for:** Students who want to manage repositories, deploy files directly, edit code online, or use the Remix features.
*   **Information accessed:** ClassHost requests access to your public profile and public repositories.

---

## Installing the GitHub Integration App

Because ClassHost publishes websites directly to your personal GitHub account, you must authorize our GitHub App.

### Step-by-Step Installation

1.  Navigate to the ClassHost Dashboard and click **Connect GitHub Account**.
2.  You will be redirected to the official GitHub integration page: [github.com/apps/classhost](https://github.com/apps/classhost).
3.  Choose whether to install the app on **All Repositories** or **Only Select Repositories**.
    > [!TIP]
    > Choosing **All Repositories** is recommended for students, as it allows ClassHost to easily enable GitHub Pages, read template repos, and deploy remixes without requesting additional permission popups later.
4.  Click **Install & Authorize**.
5.  GitHub will redirect you back to ClassHost, and your account will show as **Connected**.

---

## Permission Clarifications

We take your security very seriously. Here is an honest breakdown of the permissions requested by the ClassHost App:

| Scope | Permission Level | Why we need it |
| :--- | :--- | :--- |
| **Repository Contents** | Read & Write | To upload your HTML, CSS, and JS files, create files, and commit edits to your repositories. |
| **GitHub Pages** | Read & Write | To activate public hosting (\`.github.io\`) on your newly created web repositories. |
| **Repository Metadata** | Read Only | To list your existing repositories so you can deploy them directly. |

---

> [!WARNING]
> ClassHost will **never** request access to your private repositories, billing information, or security settings. We will never commit code without your explicit trigger via the web interface. All actions are initiated directly by your button taps.`
  },
  {
    slug: "guides/getting-started/first-project",
    title: "Creating Your First Project",
    description: "A quick tutorial on creating, reviewing, and publishing your very first web page on ClassHost.",
    category: "Getting Started",
    categorySlug: "getting-started",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 3,
    content: `# Creating Your First Project

Follow this guide to create a simple web page, upload it, and share the live link with your teacher or classmates.

---

## Step 1: Write Your HTML
On your computer or mobile phone, create a new folder named \`my-first-site\`. Inside this folder, create a file named \`index.html\`.

Open the file in a text editor (like Notepad, VS Code, or a mobile code editor) and paste this template:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aking Unang Website</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 50px;
      background: #fafafa;
      color: #333;
    }
    h1 { color: #ff6a4d; }
  </style>
</head>
<body>
  <h1>Kamusta, Mundo!</h1>
  <p>Ito ang aking unang website na ginawa gamit ang ClassHost.</p>
</body>
</html>
\`\`\`

Save the file.

---

## Step 2: Package into a ZIP File
To deploy a folder, you must compress it into a ZIP file.
*   **Windows:** Right-click the folder \`my-first-site\` → **Send to** → **Compressed (zipped) folder**.
*   **macOS:** Right-click the folder → **Compress "my-first-site"**.
*   **Android/iOS:** Use your file manager to compress or "zip" the folder.

> [!IMPORTANT]
> Ensure that \`index.html\` is sitting directly in the root of the ZIP file, not nested inside another folder level.

---

## Step 3: Deploy via ClassHost

1.  Log in to [classhost.app](https://classhost.vercel.app).
2.  Click **Deploy Project** in the navigation bar.
3.  Drag your ZIP file into the upload zone, or tap to select it from your device.
4.  ClassHost will read the ZIP file in-browser and list the files detected.
5.  Type a project name (e.g., \`first-project\`).
6.  Set the visibility to **Public** so others can see it.
7.  Tap **Deploy**.

---

## Step 4: Go Live!
ClassHost will talk to GitHub to create the repository and push your code. Once deployed, you will see a card with your live URL:
\`https://username.github.io/first-project/\`

> [!NOTE]
> The initial activation by GitHub Pages can take up to 2 minutes. If you see a **404 Page Not Found** error, don't worry! Wait one minute and refresh the page.`
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
    content: `# Deploying via ZIP Files

Deploying from a ZIP file is the fastest way to get local HTML/CSS assignments live on the internet. It eliminates the need for Git setup, CLI terminals, or file transfer protocols (FTP).

---

## Requirements and Constraints

To ensure your ZIP file deploys correctly, verify it complies with these rules:

*   **HTML Entry Point:** Your archive must contain an \`index.html\` file located directly at the root of the ZIP.
*   **Size Limit:** Maximum file size is **10 MB**. Large audio, video, or database files should be hosted externally (e.g., using YouTube embeds, Google Drive, or Cloudinary).
*   **No Double Nesting:** Do not ZIP the parent folder itself. ZIP the *contents* of the folder.

### Incorrect Structure:
\`\`\`
my-project.zip
└── my-project/ (nested folder)
    ├── index.html
    ├── style.css
    └── script.js
\`\`\`

### Correct Structure:
\`\`\`
my-project.zip
├── index.html
├── style.css
└── script.js
\`\`\`

---

## Step-by-Step Deploy Guide

### Step 1: Uploading the Archive
On your ClassHost dashboard, click **Deploy Existing Code** and select **Upload ZIP**. Drag your ZIP archive directly into the drop zone, or browse your device storage to select it.

### Step 2: Browser Extraction
ClassHost extracts the ZIP file completely in the client's browser using a JavaScript-based zip parser. It lists all files found inside. Review this list to ensure files like images, CSS stylesheets, and JS scripts are mapped correctly.

### Step 3: Naming Your Repository
Provide a slug name for your project (e.g. \`portfolio-website\`). This name will form the URL of your site:
\`https://yourusername.github.io/portfolio-website/\`

### Step 4: Select Visibility
Choose how your project is shown in ClassHost galleries:
*   **Public:** Visible on the Explore page and student profiles. Anyone can view and remix.
*   **Unlisted:** Accessible to anyone with the URL, but hidden from public feeds.
*   **Private:** Only visible to you and your teacher (for classroom assignment submissions).

### Step 5: Commit and Wait
Click **Start Deploy**. ClassHost base64-encodes the files and submits them to GitHub via a single commit.

---

> [!TIP]
> **Dealing with the 404 Error:** GitHub Pages takes 30 to 120 seconds to compile your code and build the CDN cache. If your live site link returns a 404, simply wait and refresh your browser. You can check the build status indicator directly in ClassHost.`
  },
  {
    slug: "guides/deploying/import-from-github",
    title: "Import from GitHub Repository",
    description: "Learn how to deploy an existing GitHub repository directly to ClassHost.",
    category: "Deploying Projects",
    categorySlug: "deploying",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 2,
    content: `# Import from GitHub Repository

ClassHost meets students and developers where they are. If you have already pushed a static website repository to GitHub—either via VS Code, command-line Git, or a code template—you can import it directly into ClassHost.

---

## How the Import Flow Works

When you import an existing repository, ClassHost does not duplicate your files. Instead, it inspects your repository metadata, configures public hosting, and tracks the project in your classroom portfolio.

\`\`\`
[User Selects Repository] ──> [Check Pages Status]
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      ▼ (Not Active)                                          ▼ (Already Active)
[Enable GitHub Pages via API]                          [Import Metadata Directly]
      │                                                       │
[Poll Pages Build Status] ────────────────────────────────────┼──> [Success!]
\`\`\`

---

## Import Walkthrough

1.  On the dashboard, click **Deploy Project** and choose the **Import Existing Repository** tab.
2.  ClassHost will load a list of your public repositories via the GitHub REST API.
3.  Select the repository you wish to host.
4.  **Static Validation Check:** ClassHost reviews your repository's default branch.
    *   It checks for an \`index.html\` at the root level.
    *   If no root \`index.html\` is found, but the project contains package files (like \`package.json\`), ClassHost prompts you to specify a build output folder (e.g., \`dist/\`, \`build/\`, or \`docs/\`).
5.  Choose your ClassHost visibility level (Public, Unlisted, or Private).
6.  Click **Confirm Import**.

---

## Framework & Build Output Support

For students using front-end frameworks (Vite, React, SolidJS, or Svelte):
*   ClassHost detects if your project needs a build directory.
*   Make sure you have run the build command (e.g., \`npm run build\`) locally and pushed the output directory to GitHub, OR configured a GitHub Action that publishes the build folder to a branch (like \`gh-pages\`).
*   In the ClassHost import menu, set the target branch to the branch holding your static assets (commonly \`gh-pages\` or \`main\`) and the subfolder to your build folder (commonly \`dist\` or \`/\`).

---

> [!WARNING]
> If your repository contains backend files (like Express.js Node code, Django python files, or Laravel PHP scripts), ClassHost will import the repository metadata, but the site will not render dynamic server operations. GitHub Pages only serves client-side HTML, CSS, and JS.`
  },
  {
    slug: "guides/deploying/remix-projects",
    title: "The Remix Ecosystem",
    description: "How to copy, customize, and attribute existing templates and public projects on ClassHost.",
    category: "Deploying Projects",
    categorySlug: "deploying",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 3,
    content: `# The Remix Ecosystem

Remixing is one of the most powerful ways to learn web development. Instead of starting from a blank page, you can copy an existing public template, study how it was built, and modify it to create something new.

ClassHost builds this open-source philosophy directly into the classroom dashboard.

---

## How Remixing Works

When you remix a project:
1.  **Code Copying:** ClassHost reads the files from the source repository using the GitHub API.
2.  **Browser Cloning:** The files are loaded into your browser cache.
3.  **New Repository:** ClassHost creates a brand new repository under **your** GitHub account.
4.  **Attribution Mapping:** ClassHost logs the parent repository in our database.
5.  **Deployment:** The files are pushed to your account, and your site goes live.

Your new project will clearly display:
> 🔄 *Remixed from @originalusername/project-name*

---

## How to Remix a Project

1.  Go to the **Explore** page on ClassHost to browse public student projects, templates, and classroom examples.
2.  Tap on any project card to open its details and view the live website preview.
3.  If the project is public, you will see a **Remix Project** button. Tap it.
4.  ClassHost will prompt you to name your new project.
5.  Click **Confirm Remix**.
6.  Wait 15 seconds while ClassHost sets up the repository.
7.  Once finished, the project is added to your account. You can now edit the code online, upload new ZIPs to overwrite it, or download the files to work locally.

---

## Academic Integrity & Plagiarism

Remixing is encouraged for learning, but it must be done responsibly:
*   **Automatic Attribution:** ClassHost handles attribution automatically. Do not attempt to bypass or delete the "Remixed from" markers.
*   **Significant Modification:** If you submit a remixed project for a classroom activity, you must make meaningful modifications. Submitting an identical copy of another student's work is considered academic dishonesty.
*   **License Respect:** Always respect the licenses included in open-source templates.

---

> [!TIP]
> Teachers can view the entire "remix tree" for any student project, showing who created the original code and who modified it. This makes tracking collaboration and attribution simple and transparent.`
  },
  {
    slug: "guides/managing-projects/configuration",
    title: "Project Configuration",
    description: "Manage visibility, edit files online, update content, or delete repositories.",
    category: "Managing Projects",
    categorySlug: "managing-projects",
    section: "guides",
    lastUpdated: "2026-06-22",
    order: 1,
    content: `# Project Configuration

Once your website is deployed, you can manage its settings, update its files, or delete it entirely from the project dashboard.

---

## Editing Project Settings

Go to your dashboard, click **My Projects**, and select the project you want to manage.

### 1. Changing Visibility
You can change the visibility of your project at any time:
*   **Public:** Shown on the explore feed and search results. Anyone can view and remix.
*   **Unlisted:** Hidden from public feeds, but anyone with the link can view.
*   **Private:** Restrained. Only you and your classroom teachers can view.

### 2. Updating Website Files
If you have made edits locally:
1.  ZIP your updated project files (ensuring \`index.html\` is at the root).
2.  On the project dashboard, click **Update Files**.
3.  Upload the new ZIP.
4.  ClassHost will commit the updates directly to your existing GitHub repository, triggering an automatic rebuild.

---

## Regenerating QR Codes

For classroom presentations, ClassHost includes a vector QR Code generator:
*   On the project dashboard, click the **QR Code** button.
*   You can display this on screen for classmates to scan.
*   You can download the QR Code as a clean SVG or high-resolution PNG to print on flyers, project boards, or submit to offline school exhibits.

---

## Deleting a Project

If you no longer want to host your project, you can delete it:

1.  Scroll to the bottom of the project settings page to the **Danger Zone**.
2.  Click **Delete Project**.
3.  ClassHost will ask you:
    *   *Do you want to delete the project from the ClassHost dashboard only?* (Keeps the repository live on your GitHub).
    *   *Do you want to delete the repository from GitHub as well?* (Permanent deletion of all files and hosting).
4.  Confirm your choice.

---

> [!WARNING]
> Deleting a repository from GitHub is irreversible. Ensure you have a local copy of your files before selecting this option.`
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
    content: `# Join a Classroom (Students)

Classrooms on ClassHost allow teachers to assign web development tasks, review student websites side-by-side with code, and input grades. This guide explains how students join a class and submit their assignments.

---

## Joining a Classroom

### Step 1: Obtain the Classroom Code
Ask your teacher for the unique classroom code. It is an alphanumeric string formatted like this:  
\`CLASS-IT3A-WEBDEV\` or \`CLASS-8X9Y12\`

### Step 2: Submit the Code
1.  Log in to [classhost.app](https://classhost.vercel.app).
2.  Click **Classroom** in the main navigation.
3.  Click the **Join Classroom** button.
4.  Enter the code exactly as provided by your teacher and click **Submit**.

### Step 3: Wait for Teacher Approval (If Enabled)
Some classrooms have **Approval Gates** active to prevent unauthorized accounts from joining the roster.
*   If approval gates are enabled, your status will show as **Pending**.
*   Once your teacher approves your profile, you will receive full access to the classroom dashboard.

---

## Submitting Assignments

When your teacher posts an activity, it will show up on your classroom home page.

### How to Submit:
1.  Click on the activity name to view the requirements, guidelines, and due date.
2.  Deploy the project you want to submit (via ZIP upload, existing repository, or remixing).
3.  Go back to the activity page and click **Submit Assignment**.
4.  Select your deployed project from the dropdown list.
5.  Click **Submit**.

---

> [!IMPORTANT]
> **Late Submissions:** If you submit after the due date, ClassHost will stamp your submission as **LATE**. If you update the files in your GitHub repository after submitting, the teacher will automatically see the latest version when they view your page, but the commit history will reveal if files were edited after the deadline.`
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
    content: `# Create & Manage a Classroom (Educators)

ClassHost provides educators with a complete classroom portal tailored specifically for static web development courses. It removes the administrative burden of collecting URLs, loading code, and hosting student projects.

---

## Creating a Classroom

1.  Log in to ClassHost using your educator account.
2.  Navigate to the **Classroom** tab and click **Create Classroom**.
3.  Input the following details:
    *   **Class Name:** e.g., *Introduction to HTML/CSS (BSIT-2A)*
    *   **Academic Term:** e.g., *1st Semester 2026-2027*
    *   **Institution:** Name of your school or university.
    *   **Approval Gates (Toggle):** If enabled, you must manually approve each student who requests to join the class.
4.  Click **Create**.
5.  ClassHost will generate a unique alphanumeric **Class Code** (e.g., \`CLASS-9K2L88\`). Share this code with your students.

---

## Managing Student Rosters

In the classroom dashboard, click **Roster**:
*   View all enrolled students and their connected profiles.
*   Approve pending join requests (if approval gates are active).
*   Remove students from the roster if they drop the course.

---

## Creating Activities

1.  In your classroom dashboard, go to the **Activities** tab.
2.  Click **Create Activity**.
3.  Provide a Title (e.g., *Personal Portfolio Project*), Description/Guidelines, and set a **Due Date** and **Due Time**.
4.  You can optionally attach a **Template Repository** (e.g. your own HTML scaffolding repository). Students can click \"Remix Template\" directly from the activity page.
5.  Click **Post Activity**.

---

## Grading Side-by-Side

ClassHost features a custom grading workspace. When a student submits a website, you do not need to download zip archives or host their files:

*   **Roster Submissions:** Click on any activity to see a list of student submissions.
*   **Dual-Pane Review:** Select a student. ClassHost loads their live hosted site in an iframe on the left, and pulls their raw HTML/CSS files from their GitHub repository on the right.
*   **Feedback & Grades:** Input a score (e.g., 95/100) and write structured feedback comments.
*   **Export Grades:** Once grading is complete, click **Export Gradebook** to download all grades as a clean CSV file to import directly into Excel or your school's LMS.`
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
**Version:** 2.2

ClassHost is committed to protecting the privacy of students and educators. We believe in complete transparency and data minimization. This privacy policy explains what data we collect, how it is processed, and your rights under the law.

---

## Summary (TL;DR)
*   **We do not store your website files.** They live on your personal GitHub account.
*   **We never sell your personal information.**
*   **We collect minimal data:** Just your Google/GitHub usernames, email addresses, and public repository links.
*   **Philippine DPA Compliant:** Fully aligned with Republic Act No. 10173.

---

## 1. Information We Process

### A. Account Information
*   **GitHub Authentication:** When you link GitHub, we receive your public username, your user ID, and your profile avatar URL. We use this to connect to the GitHub API.
*   **Google Authentication:** If you sign in via Google, we collect your display name, email address, and avatar URL.

### B. Classroom Metadata
To operate classrooms, our database (powered by Supabase) stores:
*   Classroom names, rosters, activities, due dates, scores, and feedback comments written by teachers.
*   The URLs of public website repositories deployed through ClassHost, enabling class galleries and grading reviews.

---

## 2. No Code Storage Policy
ClassHost does not host or store your website code on our servers. When you upload a ZIP file or commit code:
1.  The files are processed locally in your browser.
2.  They are transmitted directly to GitHub's secure servers via the GitHub REST API.
3.  Your static hosting is handled by **GitHub Pages**.

---

## 3. Compliance with the Philippine Data Privacy Act (R.A. 10173)

We respect your rights under the Data Privacy Act of 2012:
*   **Right to be Informed:** You have the right to know how your data is collected and processed.
*   **Right to Access:** You can request a copy of the metadata we store about your classroom profile.
*   **Right to Rectification:** You can edit your profile information at any time.
*   **Right to Erasure (To be Forgotten):** You can delete your ClassHost account. This removes all your classroom history and metadata from our servers immediately.
    > [!NOTE]
    > Deleting your ClassHost account does not delete your code repositories on GitHub. Since those are on your GitHub account, you have full sovereign control to keep or delete them independently.

---

## 4. Contact Information
For privacy concerns, data deletion requests, or DPA questions, please contact our designated data compliance officers at:  
📧 **privacy@classhost.app**`
  },
  {
    slug: "legal/terms-of-service",
    title: "Terms of Service",
    description: "Rules, conduct guidelines, and legal terms for using the ClassHost platform.",
    category: "Legal & Compliance",
    categorySlug: "legal",
    section: "legal",
    lastUpdated: "2026-06-22",
    content: `# Terms of Service

**Last Updated:** June 22, 2026  
**Version:** 1.8

Welcome to ClassHost. By using our application, web platform, or services, you agree to comply with the terms and conditions outlined below. Please read them carefully.

---

## 1. Educational Use Only
ClassHost is an educational platform designed for classrooms, students, and educators. It is not intended for:
*   Commercial website hosting.
*   Hosting business portfolios or commercial stores.
*   Setting up high-traffic production databases.

---

## 2. Rules of Student Conduct
You are responsible for all files and content published under your account. By using this service, you agree **not** to upload:
*   **Illegal Content:** Any files that promote violence, illegal substances, or comply with criminal activities.
*   **Harassment:** Websites containing defamatory statements, bullying, or hate speech targeting classmates, teachers, or communities.
*   **Academic Misconduct:** Directly plagiarizing or copy-pasting classmate submissions without authorization or remix attribution.
*   **Phishing & Malware:** Creating fake login pages, spam sites, scams, or scripts designed to steal passwords or distribute viruses.
    > [!CAUTION]
    > Accounts detected hosting phishing sites or malicious redirects will be **permanently banned** immediately, and reported to GitHub Abuse Operations.

---

## 3. Code Ownership & Sovereignty
All source code and assets deployed through ClassHost remain the intellectual property of the student.
*   ClassHost claims no ownership or licenses over your code.
*   Because your code is committed to your personal GitHub account, you maintain full control over who accesses, forks, or modifies your files.

---

## 4. Limitation of Liability
ClassHost uses GitHub's API and Supabase database services. We provide the service on an "as-is" basis and are not liable for:
*   Any temporary hosting downtime caused by GitHub or external service providers.
*   Accidental loss of local files (always maintain backups).
*   Moderation actions taken by school administrations or teachers inside their private classrooms.`
  },
  {
    slug: "legal/data-sovereignty",
    title: "Data Sovereignty Policy",
    description: "Our core commitment to zero platform lock-in and student code ownership.",
    category: "Legal & Compliance",
    categorySlug: "legal",
    section: "legal",
    lastUpdated: "2026-06-22",
    content: `# Data Sovereignty Policy

Data sovereignty is the core philosophical pillar of ClassHost. We believe that when students learn to write code, that code belongs to them—not to a school portal, not to an LMS provider, and not to ClassHost.

---

## What is Data Sovereignty?

In commercial web builders, your website files are locked inside proprietary hosting architectures. If you stop paying their monthly subscription, or if you close your account, your code is deleted, and your website disappears.

ClassHost prevents this by design. Because we deploy your files directly into your personal **GitHub** account, you are the sole owner of the code, history, and hosting configurations.

---

## The Zero Lock-In Guarantee

*   **No Vendor Lock-In:** You do not need ClassHost to access your code. You can log in directly to [github.com](https://github.com) at any time to view, download, or edit your files.
*   **Permanent Hosting:** If you graduate, finish your class, or delete your ClassHost account, **your websites remain live**. Your hosting on GitHub Pages is controlled by your GitHub profile, not our servers.
*   **Portability:** You can download your repositories as ZIP files, clone them to your local computer, or easily deploy them to other hosting platforms (like Vercel, Netlify, or Cloudflare Pages) without needing our permission.

---

## Best Practices for Students

To maintain full control of your digital identity, we recommend:
1.  **Keep Your GitHub Account Active:** Use a personal email address for your GitHub account, not a temporary school email, so you can access your repositories after you graduate.
2.  **Back Up Critical Projects:** Maintain local copies of your code on your personal computer or USB drives.
3.  **Study Git Commands:** Use ClassHost as a stepping stone. Once you feel comfortable, learn how to use Git in the terminal to push code without any web dashboard helper.`
  },
  {
    slug: "safety/moderation-rules",
    title: "Safety & Content Moderation",
    description: "How we screen public galleries, report abusive websites, and handle security.",
    category: "Safety & Moderation",
    categorySlug: "safety",
    section: "safety",
    lastUpdated: "2026-06-22",
    content: `# Safety & Content Moderation

ClassHost is committed to maintaining a safe, inclusive, and professional environment for learning. This guide explains our content moderation standards, reporting procedures, and security filters.

---

## Tiered Moderation Structure

We use a three-tier moderation structure to maintain safety while respecting student creativity:

\`\`\`
┌──────────────────────────────────────────────┐
│             TEACHER MODERATION               │
│ Teachers approve rosters and moderate private │
│ classroom submissions.                       │
├──────────────────────────────────────────────┤
│             AUTOMATED FILTERS                │
│ Automated scripts scan file uploads for      │
│ common malware, script injections, & phishing.│
├──────────────────────────────────────────────┤
│             COMMUNITY REPORTING              │
│ Users can flag inappropriate content via the │
│ "Report Site" button on public galleries.     │
└──────────────────────────────────────────────┘
\`\`\`

---

## Moderation Policies

We strictly enforce moderation on public galleries (Explore tab). The following content is prohibited:

### 1. Phishing & Malicious Code
Websites designed to look like official login pages (e.g., fake Facebook, Google, or bank logins) to steal student passwords. Script uploads containing obfuscated JavaScript or redirects.

### 2. NSFW Content
Pornography, sexually explicit text or images, and websites promoting commercial adult services.

### 3. Cyberbullying & Harassment
Websites targeting specific classmates, students, or educators with insults, private images, or defamatory content.

---

## Reporting Abusive Sites

If you find a website hosted on ClassHost that violates these terms:
1.  Open the website in your browser.
2.  Click the **Report Content** link on the project details card in the ClassHost dashboard.
3.  Fill out the form, providing the URL and the reason for the report.
4.  Our safety team will review the content within **12 hours**. If a violation is found, the project metadata is removed from ClassHost, and the repository is reported to GitHub Abuse Operations.

---

> [!CAUTION]
> Because students own their GitHub accounts, ClassHost safety teams cannot delete files directly from your personal GitHub. If a student refuses to delete malicious content, ClassHost will request GitHub to terminate the repository or revoke the app authentication.`
  },
  {
    slug: "transparency/how-classhost-works",
    title: "Technical Architecture",
    description: "A deep dive into how ClassHost deploys code client-side using Supabase and the GitHub API.",
    category: "Transparency",
    categorySlug: "transparency",
    section: "transparency",
    lastUpdated: "2026-06-22",
    content: `# Technical Architecture

ClassHost is a static-first web application built with **React**, **Vite**, and **TypeScript**. Understanding our technical architecture helps students understand where their data goes and how the web functions.

---

## Architecture Flow

Here is a simple blueprint of how ClassHost interacts with external servers:

\`\`\`
┌──────────────┐          GitHub API          ┌──────────────┐
│  ClassHost   ├─────────────────────────────>│  GitHub CDN  │
│  (In-Browser │                              │  (Hosts your │
│  React App)  │                              │  live site)  │
└──────┬───────┘                              └──────────────┘
       │
       │ Syncs Rosters &
       │ Grading Metadata
       v
┌──────────────┐
│   Supabase   │
│   Database   │
└──────────────┘
\`\`\`

---

## Step-by-Step Deployment Workflow

When you click **Start Deploy**, the following actions happen entirely inside your browser:

### 1. File Reading & In-Memory Extraction
If you upload a ZIP file, the browser uses a JavaScript library (\`jszip\`) to unpack the files in-memory. It maps the files into a dictionary representation:
\`\`\`typescript
const fileTree = {
  "index.html": "Base64Content...",
  "css/style.css": "Base64Content...",
  "js/app.js": "Base64Content..."
};
\`\`\`

### 2. Creating the Repository
ClassHost makes a authenticated POST request to GitHub's REST API:
\`POST /user/repos\`  
Passing configurations like:
\`\`\`json
{
  "name": "my-first-site",
  "description": "Deployed via ClassHost",
  "private": false
}
\`\`\`

### 3. Creating a Multi-File Commit Tree
To push multiple files in a single transaction without a local Git terminal:
*   **Create Blobs:** ClassHost uploads each file's Base64 content to GitHub to generate SHA identifiers:  
    \`POST /repos/{owner}/{repo}/git/blobs\`
*   **Create Tree:** It organizes these SHAs into a folder tree hierarchy structure:  
    \`POST /repos/{owner}/{repo}/git/trees\`
*   **Create Commit:** It creates a commit referencing the new tree and the parent commit SHA:  
    \`POST /repos/{owner}/{repo}/git/commits\`
*   **Update Ref:** It updates the default branch pointer to reference the new commit ID:  
    \`PATCH /repos/{owner}/{repo}/git/refs/heads/main\`

### 4. Activating GitHub Pages
Once the files are pushed, ClassHost enables hosting by invoking the Pages API:
\`POST /repos/{owner}/{repo}/pages\`  
Configuring it to serve assets directly from the \`main\` branch root folder.

### 5. Supabase Sync
ClassHost stores the project URL, repository owner, visibility, and title in our Supabase database. This metadata is what appears in class activity feeds and student portfolios.`
  },
  {
    slug: "transparency/qr-engine",
    title: "QR Code Engine",
    description: "How our zero-dependency QR code generator works for classrooms.",
    category: "Transparency",
    categorySlug: "transparency",
    section: "transparency",
    lastUpdated: "2026-06-22",
    content: `# QR Code Engine

ClassHost features a zero-dependency, high-speed QR code generation engine built directly into the client application. It allows students and teachers to share website links instantly during classroom presentations.

---

## Why QR Codes in Classrooms?

Web development is highly visual. When a student completes a portfolio or game, projecting the live link on a chalkboard or whiteboard allows:
*   The entire class to scan the site and interact with it on their mobile phones.
*   Teachers to run live reviews and focus groups.
*   Offline school exhibits to display printed QR Codes next to student computer terminals.

---

## Technical Implementation

Instead of sending URL strings to a third-party tracking API (which introduces privacy vulnerabilities and delays), **ClassHost generates QR codes completely client-side in your browser**.

*   **No Tracking:** We do not route your links through redirection servers. The QR Code contains the direct link to your \`yourusername.github.io/project-name\` URL.
*   **Pure Vector SVG:** The engine compiles the QR matrix into a clean, lightweight XML SVG element. This means it has a file size of under **5 KB**, loads instantly, and can scale to any size (billboards or poster boards) without pixelation or loss of quality.
*   **PNG Converter:** For students submitting work to documents, ClassHost uses an HTML5 Canvas to convert the SVG matrix into high-resolution PNG data URLs for local download.

---

> [!TIP]
> Teachers can use the **Presentation Mode** button on the classroom dashboard to display a grid of student website previews alongside their QR codes, turning the classroom projector into an interactive project gallery.`
  },
  {
    slug: "limitations/what-classhost-cant-do",
    title: "What ClassHost Can't Do",
    description: "An honest breakdown of the limits of our static hosting model.",
    category: "Platform Limitations",
    categorySlug: "limitations",
    section: "limitations",
    lastUpdated: "2026-06-22",
    content: `# Platform Limitations

ClassHost is designed to teach and deploy **static websites**. While static hosting is incredibly powerful, secure, and fast, it has specific constraints that you must understand before building your project.

---

## Unsupported Backend Languages

You cannot host server-side applications on ClassHost. This means the following file types will not run on our servers:
*   ❌ **PHP** (\`.php\`) - e.g., WordPress sites, custom PHP mail scripts.
*   ❌ **Node.js** (\`server.js\`) - e.g., Express servers, API routing backends.
*   ❌ **Python** (\`app.py\`) - e.g., Flask or Django backends.
*   ❌ **ASP.NET / Java** - e.g., Java servlets, C# backend frameworks.

Your project should consist exclusively of client-side assets: HTML files, CSS stylesheets, Javascript scripts, JSON databases, images, and front-end assets.

---

## Solutions for Dynamic Features

If your project requires dynamic features (like user sign-ins, contact forms, or database storage), you can integrate serverless client-side services:

| Feature | Standard Solution | Client-side Integration |
| :--- | :--- | :--- |
| **Database** | MySQL / PostgreSQL | Supabase Client / Firebase Firestore |
| **Authentication** | Node.js Sessions | Supabase Auth / Google Sign-In |
| **Contact Forms** | PHP mail() | Formspree / Web3Forms / Netlify Forms |
| **File Storage** | AWS S3 / Local Disk | Cloudinary / Supabase Storage |

---

## API & File Size Restrictions

*   **10 MB Upload Limit:** The browser zip parser and base64 transmission will error if you upload files larger than 10MB.
*   **GitHub Rate Limits:** GitHub REST API limits authentication requests. If you deploy updates multiple times a minute, you may experience temporary rate-limit lockouts.
*   **Cache Propagation:** When updating website files, browsers and CDNs cached old versions. If your updates are not showing up immediately, open an incognito window or clear your browser cache.

---

> [!WARNING]
> **Never store secrets in your code.** Since all files deployed to GitHub Pages are public, do not include API keys, database passwords, or private encryption credentials in your HTML, CSS, or JS files. Anyone can inspect your source code via their browser's Developer Tools.`
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

Ang ClassHost ay isang **static-first web publishing platform** na binuo para sa mga mag-aaral at guro sa Pilipinas. Layunin nitong gawing madali at mabilis ang pagpapalabas ng inyong mga gawaing HTML, CSS, at JavaScript sa internet.

---

## Paano ito Gumagana?

Kadalasan, kapag nag-aaral ng HTML/CSS ang mga estudyante, nakikita lamang nila ang kanilang gawa sa loob ng kanilang sariling computer (local file). Mahirap itong ipakita sa guro o sa mga kamag-aral nang walang Git terminal o mamahaling hosting.

Tinutulungan kayo ng ClassHost na malampasan ito nang madali:
1.  **Pag-upload:** I-upload ang inyong mga file gamit ang simpleng drag-and-drop o i-upload ang inyong ZIP file.
2.  **Koneksyon sa GitHub:** Ikokonekta ng ClassHost ang inyong mga file sa inyong sariling **GitHub account** gamit ang API.
3.  **Libreng Hosting:** Gagamitin ng ClassHost ang **GitHub Pages** upang i-host nang libre ang inyong website. Ang inyong site ay magkakaroon ng direct link tulad ng:  
    \`https://username.github.io/project-name/\`

---

## Mga Pangunahing Katangian

*   **Soberanya sa Datos (Data Sovereignty):** Ang code ay pagmamay-ari ng estudyante, hindi ng ClassHost. Kung sakaling isara ang ClassHost, mananatiling buhay ang inyong website sa inyong GitHub account.
*   **Remix Ecosystem:** Pwede ninyong kopyahin (remix) ang gawa ng inyong mga kaklase o mga templates upang matuto at baguhin ito, habang awtomatikong binibigyan ng kredito ang orihinal na gumawa.
*   **Classroom Integration:** May sariling portal para sa mga guro para magbigay ng assignments, tignan ang isinumiteng site ng mag-aaral nang magkatabi ang code at preview, at mag-input ng grado.`
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

Ang pag-upload gamit ang ZIP file ang pinakamadaling paraan upang mai-publish ang inyong gawaing website sa internet nang hindi na kailangang matutunan ang Git terminal o command-line.

---

## Mga Tuntunin Bago Mag-upload

*   **index.html:** Dapat na mayroong file na may pangalang \`index.html\` sa pinaka-root level ng inyong ZIP file. Dito magsisimula ang inyong website.
*   **Limitasyon sa Sukat:** Ang ZIP file ay hindi dapat lumagpas sa **10 MB**.
*   **Tamang Pag-compress:** Huwag i-compress ang mismong folder. I-compress ang mga **nilalaman** (files at subfolders) ng folder.

---

## Hakbang-hakbang na Gabay

### 1. Pag-sign In
Pumunta sa [classhost.app](https://classhost.vercel.app) at mag-log in gamit ang inyong Google o GitHub account.

### 2. I-upload ang ZIP File
Pumunta sa **Deploy** page at i-drag ang inyong ZIP file sa upload zone, o i-click ito upang mag-browse sa inyong computer o mobile phone.

### 3. Suriin ang mga File
Ipapalabas ng ClassHost ang listahan ng mga file na nakita sa loob ng inyong ZIP. Siguraduhing nandoon ang \`index.html\`, inyong CSS, JS, at mga larawan.

### 4. Pangalanan ang Project
Mag-type ng pangalan ng project (halimbawa, \`aking-portfolio\`). Ito ang magiging URL ng inyong website.

### 5. I-deploy at Mag-antay
I-set ang visibility sa **Public** (o **Private** kung ito ay classroom assignment) at i-click ang **Deploy**. Mag-antay ng **1 hanggang 2 minuto** habang inaayos ng GitHub ang inyong server.`
  },
  {
    slug: "filipino/legal/privacy-policy",
    title: "Patakaran sa Privacy (Filipino)",
    description: "Ang patakaran sa privacy ng ClassHost sa wikang Filipino alinsunod sa Data Privacy Act.",
    category: "Filipino (Tagalog)",
    categorySlug: "filipino",
    section: "filipino",
    lastUpdated: "2026-06-22",
    content: `# Patakaran sa Privacy

**Huling Na-update:** Hunyo 22, 2026  
**Epektibo:** Hulyo 1, 2026  

Pinapahalagahan ng ClassHost ang inyong privacy. Nilalayon nitong dokumento na ipaliwanag kung anong impormasyon ang aming kinokolekta at paano ito pinapangalagaan alinsunod sa **Data Privacy Act of 2012 (R.A. 10173)** ng Pilipinas.

---

## Mga Impormasyong Aming Pinoproseso

### A. Impormasyon sa Account
*   **GitHub Login:** Kinukuha namin ang inyong username, user ID, at profile picture URL. Ginagamit ito para magawa ang mga repositoryo sa inyong account.
*   **Google Login:** Kinukuha namin ang inyong pangalan at email address para sa pagpapatunay (authentication) at pagbawi ng account.

### B. Classroom Metadata
Upang mapatakbo ang mga virtual classroom, iniimbak ng aming database (powered by Supabase):
*   Mga pangalan ng classroom, listahan ng estudyante, grado, at puna (comments) na isinulat ng guro.
*   Ang mga link ng mga project na inyong isinumite para sa mga aktibidad.

---

## Hindi Pag-iimbak ng Code (No Code Storage)

Hindi iniimbak ng ClassHost ang inyong mga website files o source code sa aming mga server.
*   Ang mga file ay binabasa lamang sa inyong browser at direktang ipinapadala sa **GitHub Pages** gamit ang opisyal na API ng GitHub.
*   Kayo ang may buong kontrol sa inyong code na nakalagay sa inyong sariling GitHub account.

---

## Inyong mga Karapatan sa Ilalim ng Data Privacy Act

Mayroon kayong karapatan na:
1.  **Malaman:** Karapatan ninyong malaman kung paano ginagamit ang inyong impormasyon.
2.  **I-access:** Maaari kayong humingi ng kopya ng inyong metadata na nakaimbak sa amin.
3.  **Baguhin o Itama:** Karapatan ninyong itama ang maling impormasyon sa inyong profile.
4.  **Burahin (Right to Erasure):** Maaari ninyong burahin ang inyong ClassHost account anumang oras. Kapag binura ang account, mawawala ang lahat ng inyong metadata at grade history sa aming database.
    > [!NOTE]
    > Ang pagbura ng ClassHost account ay hindi magbubura ng inyong code sa GitHub dahil ito ay pagmamay-ari ninyo nang direkta sa labas ng aming platform.

---

## Impormasyon sa Pakikipag-ugnayan
Kung mayroon kayong mga katanungan tungkol sa privacy o nais ninyong ipabura ang inyong datos, mag-email sa:  
📧 **privacy@classhost.app**`
  }
];
