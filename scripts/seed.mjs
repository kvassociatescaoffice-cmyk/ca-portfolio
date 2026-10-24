import mongoose from 'mongoose';
import { categoriesList, getAllServicesFlat } from '../src/lib/servicesData.js';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined.");
  process.exit(1);
}

// Schemas
const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  driveId: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: false },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  seoTitle: { type: String },
  seoDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  sourceUrl: { type: String, required: false },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  service: { type: String, default: 'General Inquiry' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'system' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortTitle: { type: String },
  badge: { type: String, default: 'Professional Services' },
  icon: { type: String, default: 'Briefcase' },
  color: { type: String, default: '#0d1d3a' },
  accent: { type: String, default: '#f0663f' },
  description: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isCustom: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, default: 'others' },
  description: { type: String, required: true },
  details: { type: String },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema);
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
const News = mongoose.models.News || mongoose.model('News', NewsSchema);
const Faq = mongoose.models.Faq || mongoose.model('Faq', FaqSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB successfully!");

  // 1. Seed Media
  console.log("Seeding Media Gallery...");
  const dummyMedia = [
    { name: 'audit.jpg', url: '/images/audit.jpg', driveId: 'media-audit-local' },
    { name: 'tax.jpg', url: '/images/tax.jpg', driveId: 'media-tax-local' },
    { name: 'gst.jpg', url: '/images/gst.jpg', driveId: 'media-gst-local' },
    { name: 'advisory.jpg', url: '/images/advisory.jpg', driveId: 'media-advisory-local' },
    { name: 'law.jpg', url: '/images/law.jpg', driveId: 'media-law-local' },
    { name: 'ca_hero_office.jpg', url: '/images/ca_hero_office.jpg', driveId: 'media-hero-local' },
    { name: 'why_choose_us.jpg', url: '/images/why_choose_us.jpg', driveId: 'media-why-local' },
    { name: 'cta_professional.jpg', url: '/images/cta_professional.jpg', driveId: 'media-cta-local' }
  ];

  for (const m of dummyMedia) {
    await Media.findOneAndUpdate({ url: m.url }, m, { upsert: true, new: true });
  }

  // 2. Seed Blogs
  console.log("Seeding Blogs...");
  const dummyBlogs = [
    {
      title: "Navigating New vs Old Tax Regime for FY 2024-25: A Strategic Analysis",
      slug: "new-vs-old-tax-regime-2024-25-analysis",
      excerpt: "An in-depth comparative guide for salaried individuals, consultants, and MSME owners to optimize tax liabilities under the latest Finance Act provisions.",
      content: `<h2>Understanding the Core Shifts in Tax Framework</h2>
<p>The Union Budget brought significant recalibration to both the default <strong>New Tax Regime</strong> (Section 115BAC) and the conventional <strong>Old Tax Regime</strong>. With the standard deduction enhanced to ₹75,000 for salaried employees and tweaked tax slabs, choosing the right structure is no longer straightforward.</p>

<h3>Key Considerations for Taxpayers:</h3>
<ul>
  <li><strong>Deductions & Exemptions:</strong> If your aggregate Chapter VI-A deductions (80C, 80D, 80G) and HRA exceed ₹3.75 Lakhs, the Old Regime may still provide higher net savings.</li>
  <li><strong>Simplicity vs Burden:</strong> The New Tax Regime reduces compliance documentation burden and offers lower base slab rates up to ₹15 Lakhs.</li>
  <li><strong>Business & Professional Income:</strong> Freelancers and professionals filing under Section 44ADA need to evaluate opting in or out carefully, as the choice can only be exercised once under specific terms.</li>
</ul>

<h3>Strategic Takeaway</h3>
<p>Consult with our direct taxation team at <em>Kumar Vashishtha & Associates</em> to simulate your personalized income thresholds and compute optimal tax outflows before the advance tax cutoff dates.</p>`,
      coverImage: "/images/tax.jpg",
      tags: ["Income Tax", "Tax Planning", "FY 2024-25", "Finance Act"],
      isPublished: true,
      seoTitle: "New vs Old Tax Regime FY 2024-25 Analysis | KV Associates",
      seoDescription: "Comprehensive comparison of New vs Old Tax Regime for FY 2024-25 with strategic insights for salaried professionals and businesses.",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Comprehensive Checklist for Annual GST Compliance & Reconciliation (GSTR-9 & 9C)",
      slug: "gst-annual-compliance-reconciliation-guide",
      excerpt: "Step-by-step audit considerations, Input Tax Credit (ITC) matching algorithms, and proactive risk mitigation for annual GST filings.",
      content: `<h2>Mastering the GSTR-9 and GSTR-9C Annual Closure</h2>
<p>Filing the annual return GSTR-9 alongside the self-certified reconciliation statement GSTR-9C requires rigorous scrutiny of books of accounts versus the GST portal data.</p>

<h3>Critical Reconciliation Focus Areas:</h3>
<ol>
  <li><strong>GSTR-2B vs Books of Accounts:</strong> Ensuring 100% ITC claims are eligible, properly matched, and reversing blocked credits under Section 17(5).</li>
  <li><strong>Outward Supplies & Turnover Match:</strong> Reconciling audited financial statements with aggregate turnover reported across monthly GSTR-1 and GSTR-3B filings.</li>
  <li><strong>Reverse Charge Mechanism (RCM):</strong> Verifying accurate liability payment under RCM for GTA, legal services, and director remuneration.</li>
</ol>

<p>A proactive internal GST audit eliminates departmental scrutiny notices, scrutiny under Section 61, and penal liabilities under Section 73/74.</p>`,
      coverImage: "/images/gst.jpg",
      tags: ["GST", "Audit", "GSTR-9", "Indirect Taxation"],
      isPublished: true,
      seoTitle: "Annual GST Compliance & Reconciliation Guide | KV Associates",
      seoDescription: "Essential checklist and compliance strategies for filing GSTR-9 and GSTR-9C accurately without receiving departmental tax notices.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Statutory Audit Preparedness: Enhancing Financial Integrity & Internal Controls",
      slug: "statutory-audit-preparedness-internal-controls",
      excerpt: "How companies can structure transparent internal financial controls (IFCoFR), CARO 2020 disclosures, and robust audit trails for seamless year-end audits.",
      content: `<h2>Elevating Audit Preparedness for Indian Enterprises</h2>
<p>Statutory audits are a cornerstone of stakeholder trust and corporate governance. With the implementation of MCA mandatory audit trail (edit log) rules and CARO 2020 disclosures, companies must demonstrate verifiable controls throughout the financial year.</p>

<h3>Core Pillars of Audit Readiness:</h3>
<ul>
  <li><strong>Accounting Software Audit Trail:</strong> Verifying continuous edit logging without tampering throughout the fiscal period.</li>
  <li><strong>Physical Verification & Asset Registers:</strong> Up-to-date fixed assets records and physical inventory count reconciliations.</li>
  <li><strong>Related Party Disclosures:</strong> Compliance with Section 188 of the Companies Act and applicable Ind AS/AS standards.</li>
</ul>

<p>Our audit team assists mid-market enterprises and growing startups in structuring streamlined pre-audit schedules.</p>`,
      coverImage: "/images/audit.jpg",
      tags: ["Statutory Audit", "CARO 2020", "Internal Controls", "Governance"],
      isPublished: true,
      seoTitle: "Statutory Audit Preparedness Guide | KV Associates",
      seoDescription: "Best practices and regulatory frameworks for preparing your company for statutory audits and CARO 2020 reporting.",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Startup Valuation & Regulatory Compliance: Demystifying Angel Tax & Section 56(2)(viib)",
      slug: "startup-valuation-regulatory-compliance-guide",
      excerpt: "A practical guide for founders raising equity rounds, exploring DCF valuation models, Merchant Banker certifications, and DPIIT tax exemptions.",
      content: `<h2>Navigating Fundraising & Regulatory Valuations</h2>
<p>For high-growth ventures issuing equity or convertible instruments, regulatory valuations under FEMA, the Income Tax Act, and the Companies Act 2013 are vital to prevent unexpected tax liabilities.</p>

<h3>Key Compliance Dimensions:</h3>
<ul>
  <li><strong>DPIIT Recognition:</strong> Availing exemption from Section 56(2)(viib) through valid DPIIT and Form 2 approvals.</li>
  <li><strong>Discounted Cash Flow (DCF) Methodology:</strong> Preparing defendable, commercially sound 5-year projections certified by registered valuers or category-I merchant bankers.</li>
  <li><strong>FDI Reporting (FC-GPR):</strong> Timely reporting on the RBI FIRMS portal within 30 days of equity allotment.</li>
</ul>

<p>Kumar Vashishtha & Associates provides end-to-end deal structuring and regulatory compliance for early and growth-stage companies.</p>`,
      coverImage: "/images/advisory.jpg",
      tags: ["Startups", "Valuation", "Angel Tax", "FEMA"],
      isPublished: true,
      seoTitle: "Startup Valuation & Angel Tax Guide | KV Associates",
      seoDescription: "Guidance on startup valuation methodologies, DPIIT exemptions, and fundraising compliance for founders and investors.",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Essential MCA & ROC Compliances for Private Limited Companies",
      slug: "essential-mca-roc-compliances-private-limited",
      excerpt: "Annual calendar of mandatory board meetings, AGM filings, AOC-4, MGT-7, DIR-3 KYC, and MSME-1 disclosures to avoid hefty statutory penalties.",
      content: `<h2>Maintaining Flawless Corporate Legal Standing</h2>
<p>Every incorporated entity in India is mandated by the Ministry of Corporate Affairs (MCA) to adhere to strict periodic filing timelines to avoid director disqualification and exponential late fees.</p>

<h3>Annual Secretarial Calendar:</h3>
<ol>
  <li><strong>DIR-3 KYC:</strong> Annual web or form verification for all DIN holders before September 30.</li>
  <li><strong>Form AOC-4:</strong> Filing audited financial statements within 30 days of the Annual General Meeting (AGM).</li>
  <li><strong>Form MGT-7/7A:</strong> Filing the annual return within 60 days of the AGM.</li>
  <li><strong>DPT-3 & MSME-1:</strong> Disclosing outstanding deposits/loans and dues to MSME vendors on half-yearly and annual bases.</li>
</ol>`,
      coverImage: "/images/law.jpg",
      tags: ["Company Law", "ROC", "MCA Compliances", "Secretarial"],
      isPublished: true,
      seoTitle: "MCA & ROC Annual Compliance Checklist | KV Associates",
      seoDescription: "Mandatory secretarial and annual ROC filing checklist for private limited companies in India.",
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const b of dummyBlogs) {
    await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true, new: true });
  }

  // 3. Seed News / Circulars
  console.log("Seeding News...");
  const dummyNews = [
    {
      title: "CBDT Issues Clarification on Tax Deducted at Source (TDS) under Section 194R and 194S",
      content: "The Central Board of Direct Taxes (CBDT) has published an exhaustive circular providing relief and guidelines regarding benefits and perquisites arising from business relationships, alongside crypto/VDA transaction reporting thresholds.",
      sourceUrl: "https://incometax.gov.in",
      isPublished: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      title: "GST Council Announces Amnesty Scheme for Pending Appeals & Input Tax Credit Rules",
      content: "Key recommendations include simplified invoice reconciliation, revised interest calculation parameters under Section 50(3), and procedural easements for exporters claiming integrated tax refunds.",
      sourceUrl: "https://cbic.gov.in",
      isPublished: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      title: "MCA Mandates Strict Adherence to Mandatory Audit Trail Feature in Accounting ERPs",
      content: "Auditors are instructed to strictly report non-compliance in auditor reports where accounting software lacks edit log features enabled continuously without administrative disablement throughout the financial year.",
      sourceUrl: "https://mca.gov.in",
      isPublished: true,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      title: "RBI Streamlines Master Directions on Compounded Offenses under FEMA Regulations",
      content: "The Reserve Bank of India has simplified the compounding application procedure for procedural lapses in foreign direct investment (FDI) reporting and downstream investment filings.",
      sourceUrl: "https://rbi.org.in",
      isPublished: true,
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const n of dummyNews) {
    await News.findOneAndUpdate({ title: n.title }, n, { upsert: true, new: true });
  }

  // 4. Seed FAQs
  console.log("Seeding FAQs...");
  const dummyFaqs = [
    {
      question: "What are the key differences between the Old and New Tax Regimes for companies and individuals?",
      answer: "The New Tax Regime provides concessional tax slabs but removes most exemptions (such as Section 80C, 80D, and HRA). The Old Tax Regime allows claiming extensive deductions. For corporate assessees, Section 115BAA offers a flat 22% rate without MAT, subject to specific conditions.",
      category: "Direct Taxation",
      order: 1,
      isPublished: true
    },
    {
      question: "When is GST registration mandatory for a newly formed business entity?",
      answer: "GST registration is mandatory when aggregate turnover exceeds ₹40 Lakhs for goods suppliers (₹20 Lakhs in special category states) and ₹20 Lakhs for service providers (₹10 Lakhs in special category states). It is also compulsory for inter-state suppliers, e-commerce sellers, and entities liable under reverse charge (RCM).",
      category: "GST & Indirect Tax",
      order: 2,
      isPublished: true
    },
    {
      question: "What is the threshold limit for mandatory Statutory Audit under the Companies Act?",
      answer: "Every company incorporated under the Companies Act, 2013 (whether private limited or public limited), regardless of turnover or capital size, is legally required to undergo an annual Statutory Audit by an independent Chartered Accountant firm.",
      category: "Audit & Assurance",
      order: 3,
      isPublished: true
    },
    {
      question: "How can our early-stage startup obtain the 80-IAC 3-year tax exemption?",
      answer: "To claim 100% tax deduction on profits under Section 80-IAC, your company must be a recognized startup by DPIIT, incorporated on or after April 1, 2016, have an annual turnover below ₹100 Crore, and receive approval from the Inter-Ministerial Board (IMB).",
      category: "Startup Advisory",
      order: 4,
      isPublished: true
    },
    {
      question: "What are the penalties for delayed filing of MCA forms AOC-4 and MGT-7?",
      answer: "Delays in filing Form AOC-4 (Financial Statements) and Form MGT-7 (Annual Return) attract a statutory additional fee of ₹100 per day of default per form, with no upper ceiling limit, in addition to potential penal action against directors.",
      category: "Corporate & ROC Compliance",
      order: 5,
      isPublished: true
    },
    {
      question: "How does Kumar Vashishtha & Associates ensure data confidentiality and secure record-keeping?",
      answer: "We adhere strictly to ICAI professional code of ethics and implement enterprise-grade encrypted storage, NDAs, and access-restricted digital infrastructure for all financial ledgers, tax filings, and client communications.",
      category: "General",
      order: 6,
      isPublished: true
    }
  ];

  for (const f of dummyFaqs) {
    await Faq.findOneAndUpdate({ question: f.question }, f, { upsert: true, new: true });
  }

  // 5. Seed Contact Leads
  console.log("Seeding Contacts / Leads...");
  const dummyContacts = [
    {
      name: "Ramesh Sharma",
      email: "ramesh.sharma@abclogistics.in",
      phone: "+91 98112 34567",
      service: "Statutory Audit",
      subject: "Annual Audit for FY 24-25",
      message: "We are an established logistics firm with ₹35 Cr turnover looking for statutory audit and internal control review services.",
      status: "new",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      name: "Priya Patel",
      email: "priya.p@nexatech.io",
      phone: "+91 98200 98765",
      service: "GST Advisory",
      subject: "GSTR-9C and Export Refund Assistance",
      message: "We need urgent assistance with our GSTR-9 annual return and export of software services refund claim under LUT.",
      status: "contacted",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      name: "Vikramaditya Verma",
      email: "vikram@horizoncapital.co",
      phone: "+91 98710 55443",
      service: "Startup Valuation",
      subject: "DCF Valuation Report for Pre-Series A",
      message: "Our fintech company is closing a ₹10 Cr funding round and requires a registered valuer DCF valuation report for Form FC-GPR and 56(2)(viib).",
      status: "resolved",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    },
    {
      name: "Sunita Roy",
      email: "sunita.roy@royhealthcare.com",
      phone: "+91 97177 88990",
      service: "Direct Taxation",
      subject: "Corporate Tax Assessment & Scrutiny",
      message: "Received an intimation notice under Section 143(1)(a) regarding disallowance of certain expenditure. Requesting consultation for reply drafting.",
      status: "new",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      name: "Arvind Mehra",
      email: "arvind@zenithexports.com",
      phone: "+91 98991 22334",
      service: "Corporate & ROC Compliance",
      subject: "Annual ROC Filing Package",
      message: "Looking for an annual secretarial retainer covering board meeting minutes, DIR-3 KYC, and AOC-4/MGT-7 filings.",
      status: "contacted",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const c of dummyContacts) {
    await Contact.findOneAndUpdate({ email: c.email }, c, { upsert: true, new: true });
  }

  // 6. Seed Notifications
  console.log("Seeding Notifications...");
  const dummyNotifications = [
    {
      title: "New Lead Received",
      message: "Ramesh Sharma from ABC Logistics submitted an inquiry for Statutory Audit.",
      type: "lead",
      isRead: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      title: "New Lead Received",
      message: "Sunita Roy submitted a consultation inquiry for Tax Assessment Notice reply.",
      type: "lead",
      isRead: false,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      title: "Quarterly Advance Tax Deadline",
      message: "Q3 Advance Tax payment installment is due on December 15. Reminder alerts dispatched.",
      type: "system",
      isRead: true,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      title: "ROC Annual Filing Window Active",
      message: "Form AOC-4 and MGT-7 bulk preparation cycle initiated for corporate client portfolio.",
      type: "system",
      isRead: true,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const notif of dummyNotifications) {
    await Notification.findOneAndUpdate({ title: notif.title, message: notif.message }, notif, { upsert: true, new: true });
  }

  // 7. Seed Categories
  console.log("Seeding Practice Area Categories...");
  for (let i = 0; i < categoriesList.length; i++) {
    const cat = categoriesList[i];
    await Category.findOneAndUpdate(
      { slug: cat.slug },
      {
        name: cat.name,
        slug: cat.slug,
        shortTitle: cat.shortTitle,
        badge: cat.badge,
        icon: cat.icon,
        color: cat.color,
        accent: cat.accent,
        description: cat.description,
        order: i,
        isCustom: false
      },
      { upsert: true, new: true }
    );
  }

  // 8. Seed Services
  console.log("Seeding Practice Area Services...");
  const flatServices = getAllServicesFlat();
  for (let i = 0; i < flatServices.length; i++) {
    const s = flatServices[i];
    const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    await Service.findOneAndUpdate(
      { title: s.title },
      {
        title: s.title,
        slug,
        category: s.categorySlug || 'others',
        description: s.description,
        details: s.description,
        order: i,
        isPublished: true
      },
      { upsert: true, new: true }
    );
  }

  console.log("Database seeded successfully with realistic dummy data for all modules including all categories and services!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
