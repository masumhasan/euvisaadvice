export const STUDIO_DASHBOARD = {
  kpis: [
    {
      label: "Total Net Revenue",
      icon: "account_balance_wallet",
      value: "€142,850",
      trend: { icon: "trending_up", text: "+18.4% vs last mo" },
      footer: [
        { label: "Payoneer:", value: "€41,200", valueClass: "text-text-primary" },
        { label: "Direct Rail:", value: "€12,450", valueClass: "text-gold-highlight" },
      ],
    },
    {
      label: "Active Course Sales",
      icon: "receipt_long",
      value: "846",
      unit: "Seats",
      trend: { icon: "arrow_upward", text: "+24% this month" },
      split: { label: "AOV Benchmark", value: "€168.85" },
    },
    {
      label: "Registered Students",
      icon: "badge",
      value: "1,420",
      note: "Visa Applicants",
      badge: { label: "Auslandsportal Track", value: "312 active" },
    },
    {
      label: "Curriculum Yield",
      icon: "verified",
      value: "72.4%",
      trend: { icon: "insights", text: "+6.1% vs peer cohort" },
      plain: { label: "Global Industry Std: ", value: "14.0%" },
    },
    {
      label: "Support Advisory SLA",
      icon: "support_agent",
      value: "2h 15m",
      trend: { icon: "check_circle", text: "99.1% within 4h SLA" },
      split: { label: "Response Target", value: "< 4h 00m" },
    },
  ],
  periods: ["30D", "90D", "12M", "YTD"],
  chart: {
    gridLabels: [
      { y: 26, text: "€25k" },
      { y: 76, text: "€20k" },
      { y: 126, text: "€15k" },
      { y: 176, text: "€10k" },
    ],
    gross: "40,190 100,165 170,150 240,135 310,110 380,85 450,70 520,55 590,45 660,32",
    payout: "40,205 100,185 170,170 240,155 310,135 380,115 450,95 520,82 590,68 660,54",
    months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT"],
  },
  tracks: [
    { title: "The German National Visa Playbook & Opportunity Card", amount: "€90,720", enrolled: "480 Enrolled Candidates", completion: 78 },
    { title: "EU Blue Card Fast-Track (§ 18g AufenthG)", amount: "€52,536", enrolled: "264 Enrolled Candidates", completion: 81 },
    { title: "Chancenkarte Points Calculator & Lodgement", amount: "€19,278", enrolled: "102 Enrolled Candidates", completion: 64, warn: true },
  ],
  transactions: [
    { id: "#PAY-99281-EU", student: "Dr. Carlos Mendoza", course: "EU Blue Card Fast-Track", amount: "€189.00", status: "Settled" },
    { id: "#PAY-99280-EU", student: "Amina Al-Mansoor", course: "Opportunity Card Playbook", amount: "€189.00", status: "Settled" },
    { id: "#PAY-99279-EU", student: "Siddharth Rao", course: "Chancenkarte Lodgement", amount: "€189.00", status: "Settled" },
    { id: "#PAY-99278-EU", student: "Elena Rostova", course: "EU Blue Card Fast-Track", amount: "€189.00", status: "Payoneer Hold" },
  ],
  queue: [
    {
      name: "Tariq J. (Software Arch.)",
      due: "Pending (1h 12m left)",
      text: "“Does the 2024 minimum threshold for § 18g AufenthG (€41,041 for shortage occupations) apply if my employment contract offers a deferred stock grant?”",
      topic: "Topic: § 18g AufenthG Salary Specs",
    },
    {
      name: "Mei-Ling Zhou (Biotech)",
      due: "Pending (2h 40m left)",
      text: "“My degree is listed as H+/- on ANABIN. Can I submit the ZAB Statement of Comparability receipt directly with the Opportunity Card visa file?”",
      topic: "Topic: ZAB Comparability",
    },
    {
      name: "Mateo Silva (Fintech Lead)",
      due: "Pending (3h 05m left)",
      text: "“Clarification requested on Chancenkarte point allocation: Does B1 English certificate award points if I also claim A2 Goethe German?”",
      topic: "Topic: Chancenkarte Points Calc",
    },
  ],
};
