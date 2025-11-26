// chartDataUtils.ts
import { ChartData } from "chart.js";
import { ArrestLogType, AttributeTypes } from "@/types/arrestLog.interface";

export function getBarChartData(
  arrestLogs: ArrestLogType[],
  attribute: AttributeTypes
): ChartData<"bar"> | null {
  if (!arrestLogs || arrestLogs.length === 0) return null;

  const attributeCounts: Record<string, number> = {};
  arrestLogs.forEach((log: ArrestLogType) => {
    const attributeValue = log.attributes[attribute] || "Unknown";
    attributeCounts[attributeValue] =
      (attributeCounts[attributeValue] || 0) + 1;
  });

  return {
    labels: Object.keys(attributeCounts),
    datasets: [
      {
        label: `Number of Arrests per ${attribute}`,
        data: Object.values(attributeCounts),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
}

export function getLineChartData(
  arrestLogs: ArrestLogType[],
  attribute: AttributeTypes
): ChartData<"line"> | null {
  if (!arrestLogs || arrestLogs.length === 0) return null;

  const attributeCount: Record<string, number> = {};
  arrestLogs.forEach((log: ArrestLogType) => {
    const date = log.attributes[attribute] || "Unknown";
    attributeCount[date] = (attributeCount[date] || 0) + 1;
  });

  return {
    labels: Object.keys(attributeCount).sort(),
    datasets: [
      {
        label: "Arrests Over Time",
        data: Object.values(attributeCount),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };
}

export function getPieChartData(
  arrestLogs: ArrestLogType[],
  attribute: AttributeTypes
): ChartData<"pie"> | null {
  if (!arrestLogs || arrestLogs.length === 0) return null;

  const attributeCounts: Record<string, number> = {};
  arrestLogs.forEach((log: ArrestLogType) => {
    const city = log.attributes[attribute] || "Unknown";
    attributeCounts[city] = (attributeCounts[city] || 0) + 1;
  });

  const pastelColors = [
    "rgba(255, 183, 197, 0.7)",
    "rgba(174, 198, 207, 0.7)",
    "rgba(255, 223, 186, 0.7)",
    "rgba(177, 156, 217, 0.7)",
    "rgba(189, 236, 182, 0.7)",
    "rgba(250, 214, 165, 0.7)",
    "rgba(217, 197, 253, 0.7)",
  ];

  return {
    labels: Object.keys(attributeCounts),
    datasets: [
      {
        label: "Arrests per City",
        data: Object.values(attributeCounts),
        backgroundColor: pastelColors.slice(
          0,
          Object.keys(attributeCounts).length
        ),
        borderColor: pastelColors
          .slice(0, Object.keys(attributeCounts).length)
          .map((color) => color.replace("0.7", "1")),
        borderWidth: 1,
      },
    ],
  };
}

export function getDoughnutChartData(
  arrestLogs: ArrestLogType[],
  attribute: AttributeTypes
): ChartData<"doughnut"> | null {
  if (!arrestLogs || arrestLogs.length === 0) return null;

  const attributeCounts: Record<string, number> = {};
  arrestLogs.forEach((log: ArrestLogType) => {
    const city = log.attributes[attribute] || "Unknown";
    attributeCounts[city] = (attributeCounts[city] || 0) + 1;
  });

  const pastelColors = [
    "rgba(255, 183, 197, 0.7)",
    "rgba(174, 198, 207, 0.7)",
    "rgba(255, 223, 186, 0.7)",
    "rgba(177, 156, 217, 0.7)",
    "rgba(189, 236, 182, 0.7)",
    "rgba(250, 214, 165, 0.7)",
    "rgba(217, 197, 253, 0.7)",
  ];

  return {
    labels: Object.keys(attributeCounts),
    datasets: [
      {
        label: "Arrests per City",
        data: Object.values(attributeCounts),
        backgroundColor: pastelColors.slice(
          0,
          Object.keys(attributeCounts).length
        ),
        borderColor: pastelColors
          .slice(0, Object.keys(attributeCounts).length)
          .map((color) => color.replace("0.7", "1")),
        borderWidth: 1,
      },
    ],
  };
}

export function getAverageArrestAgeBar(
  chartData: ChartData<"bar">
): number | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }
  // Extract the first dataset (assuming it contains the number of arrests per age)
  const dataset = chartData.datasets[0];
  const counts = dataset.data as number[];

  // Ensure labels are numbers
  const ages = chartData.labels.map((label) =>
    typeof label === "number" ? label : parseFloat(label as string)
  );

  // Validate data
  if (ages.length !== counts.length || counts.length === 0) return null;

  let totalCount = 0;
  let weightedSum = 0;

  for (let i = 0; i < ages.length; i++) {
    const age = ages[i];
    const count = counts[i];

    if (!isNaN(age) && !isNaN(count)) {
      totalCount += count;
      weightedSum += age * count;
    }
  }

  return totalCount === 0 ? null : Math.round(weightedSum / totalCount); // Rounds the final average
}

const findTopThreeIndexes = (
  arr: number[]
): { value: number; index: number }[] => {
  if (arr.length === 0) return [];

  // Create an array of { value, index} pairs and sort it in descending order
  const indexedArray = arr
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value);

  // Return the top 3 values along with their indices
  return indexedArray.slice(0, 3);
};

export function getHighestArrestStreetBar(
  chartData: ChartData<"bar">
): [string, number][] | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Filter out non-number values from the arrest count data
  const arrestCount: number[] = chartData.datasets[0].data.filter(
    (item) => typeof item === "number"
  );

  // Cast chartData.labels to a string array (we assume all labels are strings)
  const streets: string[] = chartData.labels as string[];

  // Get the top 3 streets with the highest arrest counts
  const topStreets = findTopThreeIndexes(arrestCount);

  // If no valid data found, return null
  if (topStreets.length === 0) return null;

  // Return the top 3 street names based on the sorted indices
  return topStreets.map((item) => [streets[item.index], item.value]);
}

export function getHighestChargeDescriptionLine(
  chartData: ChartData<"line">
): [string, number][] | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Filter out non-number values from the arrest count data
  const arrestCount: number[] = chartData.datasets[0].data.filter(
    (item) => typeof item === "number"
  );

  // Cast chartData.labels to a string array (we assume all labels are strings)
  const streets: string[] = chartData.labels as string[];

  // Get the top 3 streets with the highest arrest counts
  const topStreets = findTopThreeIndexes(arrestCount);

  // If no valid data found, return null
  if (topStreets.length === 0) return null;

  // Return the top 3 street names based on the sorted indices
  return topStreets.map((item) => [streets[item.index], item.value]);
}

export function getHighestRace(
  chartData: ChartData<"doughnut">
): [string, number][] | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Filter out non-number values from the arrest count data
  const arrestCount: number[] = chartData.datasets[0].data.filter(
    (item) => typeof item === "number"
  );

  // Cast chartData.labels to a string array (we assume all labels are strings)
  const streets: string[] = chartData.labels as string[];

  // Get the top 3 streets with the highest arrest counts
  const topStreets = findTopThreeIndexes(arrestCount);

  // If no valid data found, return null
  if (topStreets.length === 0) return null;

  // Return the top 3 street names based on the sorted indices
  return topStreets.map((item) => [streets[item.index], item.value]);
}

export function getMaxChartData( //takes in chart data an returns label with the highest value
  chartData:
    | ChartData<"bar">
    | ChartData<"line">
    | ChartData<"pie">
    | ChartData<"doughnut">
): number | string | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Extract the first dataset (assuming it contains the number of arrests per age)?
  const labels = chartData.labels as string[];
  const dataset = chartData.datasets[0];
  const counts = dataset.data as number[];

  let max = 0;
  let maxIndex = 0;
  counts.forEach((x, index) => {
    if (x > max) {
      max = x;
      maxIndex = index;
    }
  });

  return labels[maxIndex];
}

export function getMinChartData(
  chartData:
    | ChartData<"pie">
    | ChartData<"bar">
    | ChartData<"line">
    | ChartData<"doughnut">
): number | string | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  const counts = chartData.datasets[0].data as number[];
  const labels = chartData.labels as string[];

  let min = Infinity;
  let minIndex = -1;

  counts.forEach((x, index) => {
    if (x < min) {
      min = x;
      minIndex = index;
    }
  });

  return labels[minIndex];
}

export function getYoungestArrestAge(
  chartData: ChartData<"bar">
): number | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Extract the first dataset (assuming it contains the number of arrests per age)
  const labels = chartData.labels as number[];
  return labels[1];
}

export function getOldestArrestAge(chartData: ChartData<"bar">): number | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Extract the first dataset (assuming it contains the number of arrests per age)
  const labels = chartData.labels as number[];
  return labels[chartData.labels.length - 1];
}

//Location chart functions
export function getHighestArrestLocation(
  chartData: ChartData<"bar">
): [string, number][] | null {
  if (!chartData || !chartData.labels || !chartData.datasets.length) {
    return null;
  }

  // Filter out non-number values from the arrest count data
  const arrestCount: number[] = chartData.datasets[0].data.filter(
    (item) => typeof item === "number"
  );

  // Cast chartData.labels to a string array (we assume all labels are strings)
  const streets: string[] = chartData.labels as string[];

  // Get the top 3 streets with the highest arrest counts
  const topStreets = findTopThreeIndexes(arrestCount);

  // If no valid data found, return null
  if (topStreets.length === 0) return null;

  // Return the top 3 street names based on the sorted indices
  return topStreets.map((item) => [streets[item.index], item.value]);
}
