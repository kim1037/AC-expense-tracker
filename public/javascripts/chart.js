const ctx = document.getElementById("myChart");

window.addEventListener("load", (e) => {
  const rawCategories = document.querySelectorAll(".record-icon");
  const amount = document.querySelectorAll(".record-amount");
  const dataset = [];
  let index = 0;
  rawCategories.forEach((category) => {
    const iconName = category.firstChild.className;
    const cost = parseInt(amount[index].textContent);
    if (iconName.includes("house")) {
      dataset.push({ Housing: cost });
      index += 1;
    } else if (iconName.includes("van")) {
      dataset.push({ Transportation: cost });
      index += 1;
    } else if (iconName.includes("face")) {
      dataset.push({ Entertainment: cost });
      index += 1;
    } else if (iconName.includes("utensils")) {
      dataset.push({ Food: cost });
      index += 1;
    } else if (iconName.includes("pen")) {
      dataset.push({ Other: cost });
      index += 1;
    } else {
      index += 1;
    }
  });
  //'Transportation', 'Food', 'Housing', 'Other', 'Entertainment'
  let categories = new Set(dataset.map((data) => Object.keys(data)[0]));
  
  //set to array
  categories = [...categories]; // chart's categorey
  let chartData = Array(5).fill(0); // chart's value
  dataset.forEach((data) => {
    const category = Object.keys(data)[0]; // Food or ...
    const index = categories.indexOf(category); // 0,1,2,3,4
    chartData[index] += data[category];
  });

  const backgroundColor = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(255, 205, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    // "rgba(153, 102, 255, 0.5)",
    // "rgba(201, 203, 207, 0.5)",
  ];

  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [
        {
          backgroundColor: backgroundColor,
          borderColor: "#FFFFFF",
          borderWidth: 1,
          label: "Expense",
          data: chartData,
        },
      ],
    },
    options: {
      responsive: true, // 是否隨著視窗大小變大
      maintainAspectRatio: false, // 保持原有比例
      plugins: {
        labels: {
          render: "percentage",
          fontSize: 12,
          fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          position: "border",
        },
      },
    },
  });
});
