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
import { useToast } from "@/hooks/useToast";
import { Toaster } from "./ui/toaster";

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
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        toast({
          title: "Berhasil",
          description: "Teks prompt berhasil disalin ke clipboard.",
          variant: "success",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Gagal",
          description: "Terjadi kesalahan saat menyalin teks.",
          variant: "warning",
        });
      });
  };

  return (
    <Card className="">
      <Toaster />
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
                Maaf saya sisipin iklan dulu promptnya ada di bawah, kenalin aku
                Dhafin. Dengan latar belakang komunikasi, saya telah dipercaya
                selama lebih dari 5 tahun mengelola media sosial untuk brand,
                NGO, dan pemerintah, dengan fokus pada pembuatan strategi
                konten.
              </p>
              <p className="mt-2">
                Saat ini, saya sedang menulis buku tentang cara mengelola media
                sosial untuk meningkatkan online presence, yang diharapkan bisa
                membantu kamu lebih dikenal dan memperbesar peluang dikenal
                konsumen ataupun diterima kerja namun dengan cara membuat konten di sosial media dengan cara yang cukup praktis. Di sini juga akan dituliskan panduan untuk membuat konten dengan AI.
              </p>
              <div className="mt-2">
                Jika tertarik, silakan bisa cek landing page di goakal:{" "}
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open("https://goakal.com/dhafin/onlinepresenceAI", "_blank")
                  }
                  className="text-white "
                >
                  LANDING PAGE
                </Button>{" "}
                (Pre order TERBATAS 10 untuk orang saja)
                <p className="mt-2 font-bold">
                  📖 Apa yang akan dibahas dalam buku ini?
                </p>
                <p className="mt-2 font-bold">Dasar-Dasar Online Presence</p>
                <ul className="list-inside list-none">
                  <li>
                    ✅ Mindset Online Presence untuk Meningkatkan Peluang Kerja
                  </li>
                  <li>✅ Strategi Membangun Personal Brand dan Bisnis</li>
                  <li>
                    ✅ Optimalisasi di Berbagai Platform (Instagram, X,
                    LinkedIn, TikTok)
                  </li>
                </ul>
                <p className="mt-2 font-bold">Memanfaatkan Teknologi AI</p>
                <ul className="list-inside">
                  <li>✅ Optimalisasi Media Sosial dengan AI</li>
                  <li>✅ Tips & Trik Pemanfaatan AI untuk Pembuatan Konten</li>
                  <li>✅ Mengintegrasikan Mindset AI dalam Strategi Konten</li>
                  <li>✅ Etika menggunakan AI untuk memaksimalkan Konten</li>
                </ul>
                <p className="mt-2 font-bold">Pembuatan Konten Berkualitas</p>
                <ul className="list-inside">
                  <li>
                    ✅ Framework Pembuatan Konten untuk Personal dan Brand
                  </li>
                  <li>
                    ✅ Tools & Perangkat (Hardware & Software) yang Digunakan
                  </li>
                  <li>✅ Dasar Copywriting untuk Konten Digital</li>
                  <li>✅ Tips Pembuatan Konten Video dan Visual</li>
                </ul>
                <p className="mt-2 font-bold">
                  Optimasi Situs dan Website (BONUS)
                </p>
                <ul className="list-inside">
                  <li>✅ Cara-cara membuat situs portfolio gratis</li>
                  <li>✅ Memaksimalkan Situs Pribadi untuk Peluang Kerja</li>
                  <li>
                    ✅ Meningkatkan Profesionalitas Website Brand & Lead
                    Conversion
                  </li>
                </ul>
                <p className="mt-2 font-bold">Bonus Materi</p>
                <ul className="list-inside">
                  <li>✅ Update LIFETIME & Akses ke Komunitas Discord</li>
                  <li>✅ Kabar Terbaru dan Tren di Dunia Digital</li>
                </ul>
                <p className="mt-2 font-bold">
                  Kenapa harus beli ini sekarang???
                </p>
                <ul className="list-inside">
                  <li>
                    ✅ Insyaallah akan UPDATE LIFETIME semampu saya jika ada
                    yang bisa dibahas
                  </li>
                  <li>✅ Ada komunitas discord bisa saling berjejaring</li>
                  <li>
                    ⚠️ Beli sekarang supaya mendapat harga yang lebih terjangkau
                  </li>
                  <li>
                    ⚠️ Harga akan dinaikan karena pastinya ada peningkatan
                    penulisan dan bahasan baru ataupun ada bab yang selesai
                    ditulis
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-2 font-bold">
              {isHigherScore
                ? "Udah bagus, tapi ini promptnya kalau mau coba ningkatin value score brand kamu:"
                : "Berikut prompt untuk membantu meningkatkan value score brand kamu:"}
            </p>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
              {prompt}
              <Button
                variant="primary"
                onClick={copyToClipboard}
                className="w-full mt-4"
              >
                <span className="flex items-center gap-x-2">
                  <Copy className="h-4 w-4" /> Copy Prompt
                </span>
              </Button>
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
    disimpan dalam situs ini. Situs ini masih belum sempurna, semoga bisa membantu.
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
  const [productValues, setProductValues] = React.useState({
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
    category: keyof typeof productValues,
    type: "product" | "without",
    value: number
  ) => {
    if (type === "product") {
      setProductValues((prev) => ({ ...prev, [category]: value }));
    } else {
      setWithoutValues((prev) => ({ ...prev, [category]: value }));
    }
  };

  const generateTemplatePrompt = () => {
    const productNameValueScore = calculateValue(productValues);
    const withoutProductNameValueScore = calculateValue(withoutValues);

    return `<role>Expert brand strategist and brand research. Know the formula to calculate value score.</role> This is my product details:
${productDetails}

I have calculation and this is the component: outcome is what people want to achieve or their goal (higher is better), likelihood is the probability of success (higher is better), time is how long it takes to achieve the outcome (lower is better), effort is how much resources like money, time, energy consumer needed (lower is better)

Help me to resolve my problem. My brand value score is ${productNameValueScore} compared to ${withoutProductNameValueScore} for other product. 

The items to improve are: outcome (${productValues.outcome}), likelihood (${productValues.likelihood}), time (${productValues.time}), effort (${productValues.effort}) 

How to Resolve Problems:
1. Understand the Desired State: Clearly identify what people want to achieve. Can be immediate needs or future goals (like career, business, etc)
2. Identify Problems: Break down the obstacles preventing achievement. Can "Zoom in" to focus on specific problems or "zoom out" for comprehensive solutions.
3. Create Solutions: Increase likelihood, reduce time delay, minimize effort, and address the desired outcome.
4. Consider Context: Solutions may work differently for different market segments. Value proposition should be significantly better than existing alternatives. Important to compare against existing alternatives.

Help me improve these items based on my product details and the problem formula to increase the overall value score.`;
  };

  return (
    // Seluruh aplikasi dibungkus dengan Card menggunakan style default Tremor dan elevasi bayangan
    <Card className=" mt-4 max-w-4xl mx-auto p-4 bg-tremor-background text-tremor-content min-h-screen shadow-xl">
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
              Object.keys(productValues) as Array<keyof typeof productValues>
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
                        active={productValues[key] === value}
                        onClick={() => handleValueChange(key, "product", value)}
                      />
                    ))}
                  </div>
                  <div className="sm:hidden">
                    <ValueDropdown
                      value={productValues[key]}
                      onChange={(value) =>
                        handleValueChange(key, "product", value)
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
              <TableCell>{calculateValue(productValues)}</TableCell>
              <TableCell>{calculateValue(withoutValues)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pesan Hasil dan Prompt yang Dihasilkan */}
      <div className="mt-8 text-lg space-y-4">
        {!productName ? (
          <p>Masukan nama produk kamu dulu</p>
        ) : Number(calculateValue(productValues)) ===
          Number(calculateValue(withoutValues)) ? (
          <p>Hasilnya seimbang, tingkatkan value kamu</p>
        ) : Number(calculateValue(productValues)) >
          Number(calculateValue(withoutValues)) ? (
          <p>
            🎊🥳 {productName} jadi{" "}
            {(
              Number(calculateValue(productValues)) /
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
            Number(calculateValue(productValues)) >
            Number(calculateValue(withoutValues))
          }
        />
      </div>
    </Card>
  );
}
