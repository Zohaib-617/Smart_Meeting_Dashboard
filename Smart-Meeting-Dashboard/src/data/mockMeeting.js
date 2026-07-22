//dummy data
function daysFromNow(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export const people = [
  { id: "p1", name: "Sarah Chen", team: "Product" },
  { id: "p2", name: "Marcus Reed", team: "Engineering" },
  { id: "p3", name: "Priya Nair", team: "Engineering" },
  { id: "p4", name: "Diego Torres", team: "Design" },
  { id: "p5", name: "Amelia Osei", team: "Sales" },
  { id: "p6", name: "Jon Whitfield", team: "Marketing" },
  { id: "p7", name: "Rina Kobayashi", team: "Product" },
  { id: "p8", name: "Tomas Vidal", team: "Support" },
];

export const meetings = [
  {
    id: "m1",
    title: "Q3 roadmap sync",
    date: daysFromNow(-4),
    team: "Product",
    participantIds: ["p1", "p7", "p2"],
    transcript:
      "Sarah: Let's lock the Q3 priorities today. Marcus, where are we on the API migration?\n" +
      "Marcus: About 70% done, should wrap by end of month.\n" +
      "Rina: We should push the analytics dashboard to Q4, it's not ready.\n" +
      "Sarah: Agreed, let's move it. Anything blocking the migration?\n" +
      "Marcus: Just need sign-off on the new schema.",
    decisions: [
      { id: "d1", text: "Push analytics dashboard to Q4." },
      { id: "d2", text: "API migration proceeds as planned, targeting end of month." },
    ],
    summary:
      "The team confirmed Q3 priorities, deferred the analytics dashboard to Q4, and reviewed progress on the API migration.",
  },
  {
    id: "m2",
    title: "Client onboarding review",
    date: daysFromNow(-2),
    team: "Sales",
    participantIds: ["p5", "p8"],
    transcript:
      "Amelia: The new client flagged a slow response time on support tickets.\n" +
      "Tomas: We're short-staffed this week, I'll bring in backup from the weekend team.\n" +
      "Amelia: Can you also send them an updated onboarding doc?\n" +
      "Tomas: Yes, I'll get that out today.",
    decisions: [{ id: "d3", text: "Bring in weekend support staff temporarily to cover ticket backlog." }],
    summary:
      "Discussed a client complaint about support response times and agreed on temporary staffing to close the gap.",
  },
  {
    id: "m3",
    title: "Design system check-in",
    date: daysFromNow(-1),
    team: "Design",
    participantIds: ["p4"],
    transcript:
      "Diego: Quick solo check-in, no blockers this week. Component library is on track for the v2 release.",
    decisions: [],
    summary: "No decisions this week; design system work is on track.",
  },
  {
    id: "m4",
    title: "Engineering all-hands",
    date: daysFromNow(-10),
    team: "Engineering",
    participantIds: ["p2", "p3", "p7"],
    transcript:
      "Marcus: Let's do a longer session today covering the migration, the on-call rotation, and the incident from last week.\n" +
      "Priya: On the incident — root cause was a missing index on the events table. We should audit other tables for the same issue.\n" +
      "Marcus: Agreed, let's assign that.\n" +
      "Rina: I can help review the audit once it's ready.\n" +
      "Priya: I'll also update the on-call runbook while I'm in there.\n" +
      "Marcus: Let's also revisit the migration timeline given the incident took time away from it.\n" +
      "Priya: Realistically we're now looking at two extra weeks.\n" +
      "Marcus: Okay, let's replan around that and flag it to Sarah.\n" +
      "Rina: I'll let Product know today so it doesn't surprise anyone in the roadmap review.\n" +
      "Marcus: Perfect, thanks everyone.",
    decisions: [
      { id: "d4", text: "Audit all tables for missing indexes following the incident." },
      { id: "d5", text: "API migration timeline extended by two weeks." },
    ],
    summary:
      "Covered the recent production incident, agreed to audit for similar risks, and pushed the migration timeline out two weeks.",
  },
  {
    id: "m5",
    title: "Marketing campaign kickoff",
    date: daysFromNow(-15),
    team: "Marketing",
    participantIds: ["p6"],
    transcript:
      "Jon: Kicking off the fall campaign planning solo today, will loop in the rest of the team next week.",
    decisions: [{ id: "d6", text: "Fall campaign planning begins, full team review scheduled next week." }],
    summary: "Initial planning session for the fall marketing campaign.",
  },
];

export const actionItems = [
  {
    id: "a1",
    meetingId: "m1",
    task: "Get schema sign-off from Sarah",
    assigneeId: "p2",
    dueDate: daysFromNow(3),
    status: "open",
  },
  {
    id: "a2",
    meetingId: "m2",
    task: "Send updated onboarding doc to client",
    assigneeId: "p8",
    dueDate: daysFromNow(-1),
    status: "overdue",
  },
  {
    id: "a3",
    meetingId: "m4",
    task: "Audit tables for missing indexes",
    assigneeId: "p3",
    dueDate: daysFromNow(5),
    status: "open",
  },
  {
    id: "a4",
    meetingId: "m4",
    task: "Update on-call runbook",
    assigneeId: "p3",
    dueDate: daysFromNow(-3),
    status: "done",
  },
  {
    id: "a5",
    meetingId: "m4",
    task: "Notify Product of migration timeline change",
    assigneeId: "p7",
    dueDate: daysFromNow(1),
    status: "done",
  },
  {
    id: "a6",
    meetingId: "m5",
    task: "Share campaign brief with design and sales",
    assigneeId: "p6",
    dueDate: daysFromNow(6),
    status: "open",
  },
];

// export {meetings};
// export {people};
// export{actionItems};