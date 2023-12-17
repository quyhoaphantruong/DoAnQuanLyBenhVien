const mockTreatmentCategories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
];

const mockTreatments = {
  1: [
    { id: 101, name: "Treatment 1 - Category 1" },
    { id: 102, name: "Treatment 2 - Category 1" },
    { id: 103, name: "Treatment 3 - Category 1" },
  ],
  2: [
    { id: 201, name: "Treatment 1 - Category 2" },
    { id: 202, name: "Treatment 2 - Category 2" },
    { id: 203, name: "Treatment 3 - Category 2" },
  ],
  3: [
    { id: 301, name: "Treatment 1 - Category 3" },
    { id: 302, name: "Treatment 2 - Category 3" },
    { id: 303, name: "Treatment 3 - Category 3" },
  ],
};

export { mockTreatmentCategories, mockTreatments };
