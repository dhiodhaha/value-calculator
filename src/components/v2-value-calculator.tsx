"use client";

import React from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextInput,
  Textarea,
  Button,
  Select,
  SelectItem,
  Callout,
} from "@tremor/react";
import { Copy, AlertTriangle } from "lucide-react";

// Tombol untuk memilih nilai (untuk layar besar)
const ValueButton = ({
  value,
  active,
  onClick,
}: {
  value: number;
  active: boolean;
  onClick: () => void;
}) => (
  <Button
    variant={active ? "primary" : "secondary"}
    size="sm"
    onClick={onClick}
  >
    {value}
  </Button>
);

// Dropdown untuk memilih nilai (untuk layar kecil)
const ValueDropdown = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => (
  <Select
    className="w-auto lg:inline-flex min-w-0"
    value={value.toString()}
    onValueChange={(val: string) => onChange(Number(val))}
  >
    {[1, 2, 3, 4, 5].map((num) => (
      <SelectItem key={num} value={num.toString()}>
        {num}
      </SelectItem>
    ))}
  </Select>
);

// Komponen untuk menampilkan prompt di dalam sebuah Card
const PromptCard = ({
  prompt,
  isHigherScore,
}: {
  prompt: string;
  isHigherScore: boolean;
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <Card className="mt-4">
      <div className="p-4">
        <Button
          className="w-full"
          variant="primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Sembunyikan prompt" : "Perlihatkan prompt"}
        </Button>
        {isExpanded && (
          <>
            <div className="mt-4 text-sm">
              <p>
                Maaf saya sisipin iklan, kenalin aku Dhafin. Dengan latar
                belakang komunikasi, saya telah dipercaya selama lebih dari 5
                tahun mengelola media sosial untuk brand, NGO, dan pemerintah,
                dengan fokus pada pembuatan strategi konten.
              </p>
              <p className="mt-2">
                Saat ini, saya sedang menulis buku tentang cara mengelola media
                sosial untuk meningkatkan online presence, yang diharapkan bisa
                membantu kamu lebih dikenal dan memperbesar peluang dikenal
                konsumen ataupun diterima kerja.
              </p>
              <p className="mt-2">
                Jika tertarik, silakan pre-order melalui tautan:{" "}
                <a
                  href="https://goakal.com/dhafin/valuecalculator"
                  className="text-blue-500 hover:underline"
                >
                  https://goakal.com/dhafin/valuecalculator
                </a>{" "}
                (Pre order TERBATAS 10 untuk orang saja)
              </p>
            </div>

            <p className="mt-2 font-bold">
              {isHigherScore
                ? "Udah bagus, tapi ini promptnya kalau mau coba ningkatin value score brand kamu:"
                : "Berikut prompt untuk membantu meningkatkan value score brand kamu:"}
            </p>
            <Button
              variant="primary"
              onClick={copyToClipboard}
              className="w-full"
            >
              <span className="flex items-center gap-x-2">
                <Copy className="h-4 w-4" /> Copy Prompt
              </span>
            </Button>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
              {prompt}
            </pre>
          </>
        )}
      </div>
    </Card>
  );
};

// Komponen Callout untuk peringatan AI
const AIWarningCallout = () => (
  <Callout title="Perhatian" color="yellow" icon={AlertTriangle}>
    AI bisa membuat kesalahan. Gunakan sisi manusiamu. Tidak ada data yang
    disimpan dalam situs ini.
  </Callout>
);

/**
 * Menghitung valueScore dengan rumus:
 * valueScore = (outcome * likelihood) / (time * effort)
 */
const calculateValue = (values: {
  outcome: number;
  likelihood: number;
  time: number;
  effort: number;
}) => {
  const { outcome, likelihood, time, effort } = values;
  // Pastikan pembagi tidak 0
  return time * effort === 0
    ? "0.00"
    : ((outcome * likelihood) / (time * effort)).toFixed(2);
};

export default function ValueCalculator() {
  const [productName, setProductName] = React.useState("");
  const [productDetails, setProductDetails] = React.useState("");
  const [bootcampValues, setBootcampValues] = React.useState({
    outcome: 5,
    likelihood: 4,
    time: 2,
    effort: 3,
  });
  const [withoutValues, setWithoutValues] = React.useState({
    outcome: 5,
    likelihood: 2,
    time: 4,
    effort: 4,
  });

  const handleValueChange = (
    category: keyof typeof bootcampValues,
    type: "bootcamp" | "without",
    value: number
  ) => {
    if (type === "bootcamp") {
      setBootcampValues((prev) => ({ ...prev, [category]: value }));
    } else {
      setWithoutValues((prev) => ({ ...prev, [category]: value }));
    }
  };

  const generateTemplatePrompt = () => {
    const productNameValueScore = calculateValue(bootcampValues);
    const withoutProductNameValueScore = calculateValue(withoutValues);

    return `You are expert brand strategist and brand research. I have product:
${productDetails}

I have calculation and this is the component 
outcome is what people want to achieve or their goal (higher is better)
likelihood is the probability of success (higher is better)
time is how long it takes to achieve the outcome (lower is better)
effort is how much resources like money, time, energy consumer needed (lower is better)

Help me to resolve my problem. My brand value score is ${productNameValueScore} compared to ${withoutProductNameValueScore} for other product. 

The items to improve are: 
- outcome (${bootcampValues.outcome})
- likelihood (${bootcampValues.likelihood})
- time (${bootcampValues.time})
- effort (${bootcampValues.effort}) 

How to Resolve Problems:
1. Understand the Desired State:
   - Clearly identify what people want to achieve.
2. Identify Problems:
   - Break down obstacles preventing achievement.
3. Create Solutions:
   - Increase likelihood, reduce time delay, minimize effort, and address the desired outcome.
4. Consider Context:
   - Tailor solutions to market segments and compare against existing alternatives.

Help me improve these items based on my product details and the problem formula to increase the overall value score.`;
  };

  return (
    // Seluruh aplikasi dibungkus dengan Card menggunakan style default Tremor dan elevasi bayangan
    <Card className="max-w-4xl mx-auto p-4 bg-tremor-background text-tremor-content min-h-screen shadow-xl">
      {/* Input Produk */}

      <div className="mb-8 space-y-4 ">
        <AIWarningCallout />
        <TextInput
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nama Produk Kamu"
          className="w-full"
        />
        <Textarea
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          placeholder="Jelaskan produk kamu secara detail, mulai dari outcome, likelihood, time, effort."
          rows={4}
        />
      </div>

      {/* Tabel Perbandingan */}
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>{productName || "Product"}</TableCell>
              <TableCell>Tanpa {productName || "Product"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              Object.keys(bootcampValues) as Array<keyof typeof bootcampValues>
            ).map((key) => (
              <TableRow key={key}>
                <TableCell className="font-bold">
                  {key}
                  {key === "outcome" && (
                    <div className="text-xs text-gray-500">
                      (desired / avoiding undesired state)
                    </div>
                  )}
                  {key === "likelihood" && (
                    <div className="text-xs text-gray-500">of achievement</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="hidden sm:flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <ValueButton
                        key={value}
                        value={value}
                        active={bootcampValues[key] === value}
                        onClick={() =>
                          handleValueChange(key, "bootcamp", value)
                        }
                      />
                    ))}
                  </div>
                  <div className="sm:hidden">
                    <ValueDropdown
                      value={bootcampValues[key]}
                      onChange={(value) =>
                        handleValueChange(key, "bootcamp", value)
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="hidden sm:flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <ValueButton
                        key={value}
                        value={value}
                        active={withoutValues[key] === value}
                        onClick={() => handleValueChange(key, "without", value)}
                      />
                    ))}
                  </div>
                  <div className="sm:hidden">
                    <ValueDropdown
                      value={withoutValues[key]}
                      onChange={(value) =>
                        handleValueChange(key, "without", value)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">value score</TableCell>
              <TableCell>{calculateValue(bootcampValues)}</TableCell>
              <TableCell>{calculateValue(withoutValues)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pesan Hasil dan Prompt yang Dihasilkan */}
      <div className="mt-8 text-lg">
        {!productName ? (
          <p>Masukan nama produk kamu dulu</p>
        ) : Number(calculateValue(bootcampValues)) ===
          Number(calculateValue(withoutValues)) ? (
          <p>Hasilnya seimbang, tingkatkan value kamu</p>
        ) : Number(calculateValue(bootcampValues)) >
          Number(calculateValue(withoutValues)) ? (
          <p>
            🎊🥳 {productName} jadi{" "}
            {(
              Number(calculateValue(bootcampValues)) /
              Number(calculateValue(withoutValues))
            ).toFixed(1)}{" "}
            x lebih valuable!
          </p>
        ) : (
          <p>
            Tanpa {productName} mungkin lebih berharga dalam skenario ini.{" "}
            <span className="font-bold">Tingkatkan Value produk kamu!</span>
          </p>
        )}
        <PromptCard
          prompt={generateTemplatePrompt()}
          isHigherScore={
            Number(calculateValue(bootcampValues)) >
            Number(calculateValue(withoutValues))
          }
        />
      </div>
    </Card>
  );
}
