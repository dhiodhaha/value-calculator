"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  TextInput,
  Select,
  SelectItem,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";

type Category = "outcome" | "likelihood" | "time" | "effort";
type ValueSet = Record<Category, number>;

const CATEGORIES: Category[] = ["outcome", "likelihood", "time", "effort"];
const VALUES = [1, 2, 3, 4, 5];

const ValueInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => (
  <>
    <div className="hidden lg:flex gap-2">
      {VALUES.map((num) => (
        <Button
          key={num}
          size="sm"
          onClick={() => onChange(num)}
          variant={value === num ? "primary" : "secondary"}
          color={value === num ? "blue" : "gray"}
          className="w-12 h-10"
        >
          {num}
        </Button>
      ))}
    </div>
    <div className="lg:hidden w-24">
      <Select
        value={value.toString()}
        onValueChange={(v: string) => onChange(Number(v))}
        className="w-auto lg:inline-flex min-w-0"
      >
        {VALUES.map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num}
          </SelectItem>
        ))}
      </Select>
    </div>
  </>
);

const getCategoryLabel = (category: Category) => {
  const labels = {
    outcome: (
      <>
        Outcome
        <br />
        <span className="text-xs">(desired/avoiding undesired state)</span>
      </>
    ),
    likelihood: (
      <>
        Likelihood
        <br />
        <span className="text-xs">of achievement</span>
      </>
    ),
    time: "Time",
    effort: "Effort",
  };
  return labels[category];
};

const calculateValue = (values: ValueSet) =>
  (Object.values(values).reduce((a, b) => a + b, 0) / 4).toFixed(2);

export default function ValueCalculator() {
  const [productName, setProductName] = useState("");
  // const [darkMode, setDarkMode] = useState(false);
  const [productValues, setProductValues] = useState<ValueSet>({
    outcome: 5,
    likelihood: 4,
    time: 2,
    effort: 3,
  });
  const [withoutValues, setWithoutValues] = useState<ValueSet>({
    outcome: 5,
    likelihood: 2,
    time: 4,
    effort: 4,
  });

  const handleValueChange = (
    category: Category,
    type: "product" | "without",
    value: number
  ) => {
    const updater = type === "product" ? setProductValues : setWithoutValues;
    updater((prev) => ({ ...prev, [category]: value }));
  };

  const productScore = Number(calculateValue(productValues));
  const withoutScore = Number(calculateValue(withoutValues));

  const getResultMessage = () => {
    if (!productName) return "Masukan nama produk kamu";
    if (productScore === withoutScore)
      return "Hasilnya seimbang, tingkatkan value kamu";
    if (productScore > withoutScore) {
      return ` ${productName} jadi ${(productScore / withoutScore).toFixed(
        1
      )}x lebih berharga 🎊🥳`;
    }
    return `Tanpa ${productName} mungkin lebih berharga. Tingkatkan Value produk kamu!`;
  };

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 bg-gray-50"`}>
      <div className="max-w-4xl mx-auto space-y-6 dark:text-white">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="max-w-md"
          />
          {/* <Button onClick={() => setDarkMode(!darkMode)} variant="light">
            {darkMode ? "☀️ Light" : "🌙 Dark"} Mode
          </Button> */}
        </div>
        <div
          className={`text-lg p-4 rounded-lg ${
            productScore >= withoutScore
              ? "bg-blue-100 dark:bg-blue-900"
              : "bg-orange-100 dark:bg-orange-900"
          }`}
        >
          {getResultMessage()}
        </div>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>{productName || "Product"}</TableHeaderCell>
              <TableHeaderCell>
                Tanpa {productName || "Product"}
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CATEGORIES.map((category) => (
              <TableRow key={category}>
                <TableCell>{getCategoryLabel(category)}</TableCell>
                <TableCell>
                  <ValueInput
                    value={productValues[category]}
                    onChange={(v) => handleValueChange(category, "product", v)}
                  />
                </TableCell>
                <TableCell>
                  <ValueInput
                    value={withoutValues[category]}
                    onChange={(v) => handleValueChange(category, "without", v)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Value Score</TableCell>
              <TableCell className="font-bold text-xl">
                {calculateValue(productValues)}
              </TableCell>
              <TableCell className="font-bold text-xl">
                {calculateValue(withoutValues)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
