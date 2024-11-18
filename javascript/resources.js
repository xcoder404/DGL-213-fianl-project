function showChecklist(type) {
    const checklistResult = document.getElementById("checklist-result");
    const checklists = {
      adventure: [
        "Hiking boots",
        "Backpack",
        "First-aid kit",
        "Rain jacket",
        "Reusable water bottle",
      ],
      beach: [
        "Swimwear",
        "Sunscreen",
        "Beach towel",
        "Sunglasses",
        "Flip flops",
      ],
      business: [
        "Formal attire",
        "Laptop",
        "Business cards",
        "Notepad",
        "Work bag",
      ],
      family: [
        "Snacks",
        "Toys",
        "Travel games",
        "Portable charger",
        "Baby essentials",
      ],
    };
  
    const selectedChecklist = checklists[type];
  
    checklistResult.innerHTML = `
      <h3>Packing List for ${type.charAt(0).toUpperCase() + type.slice(1)} Trip</h3>
      <ul>
        ${selectedChecklist.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }
  