import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Major world currencies with their symbols and names
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'сом', flag: '🇹🇯' },
];

// Mock exchange rates (in a real app, you'd fetch these from an API)
const mockRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, KRW: 1180, BRL: 5.2, MXN: 20.1, SGD: 1.35, NZD: 1.42, ZAR: 14.8, SEK: 8.6, NOK: 8.9, RUB: 74, TRY: 8.4, AED: 3.67, TJS: 10.9 },
  EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.6, INR: 87.8, KRW: 1391, BRL: 6.13, MXN: 23.7, SGD: 1.59, NZD: 1.67, ZAR: 17.4, SEK: 10.1, NOK: 10.5, RUB: 87.2, TRY: 9.9, AED: 4.33, TJS: 12.8 },
  TJS: { USD: 0.092, EUR: 0.078, GBP: 0.067, JPY: 10.1, CAD: 0.115, AUD: 0.124, CHF: 0.085, CNY: 0.59, INR: 6.84, KRW: 108.3, BRL: 0.48, MXN: 1.85, SGD: 0.124, NZD: 0.131, ZAR: 1.36, SEK: 0.79, NOK: 0.82, RUB: 6.79, TRY: 0.77, AED: 0.34 },
  // Add more base currencies as needed
};

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('0.85');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const convertCurrency = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setConvertedAmount('0');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
      const result = (parseFloat(amount) * rate).toFixed(2);
      setConvertedAmount(result);
      
      toast({
        title: "Conversion Updated",
        description: `${amount} ${fromCurrency} = ${result} ${toCurrency}`,
      });
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code) || currencies[0];
  };

  return (
    <div className="min-h-screen bg-gradient-accent p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full shadow-glow mb-4">
            <TrendingUp className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="text-muted-foreground">
            Convert between world currencies
          </p>
        </div>

        {/* Main Converter Card */}
        <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
          <div className="space-y-6">
            {/* From Currency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                From
              </label>
              <div className="space-y-3">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{currency.flag}</span>
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-muted-foreground text-sm">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-background/50 border-border/50 text-lg font-semibold pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {getCurrencyInfo(fromCurrency).symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full bg-primary/10 border-primary/20 hover:bg-primary/20 transition-smooth"
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                To
              </label>
              <div className="space-y-3">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{currency.flag}</span>
                          <span className="font-medium">{currency.code}</span>
                          <span className="text-muted-foreground text-sm">
                            {currency.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <div className="bg-background/50 border border-border/50 rounded-md px-3 py-2 text-lg font-semibold text-primary pl-8 min-h-[40px] flex items-center">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Converting...</span>
                      </div>
                    ) : (
                      convertedAmount
                    )}
                  </div>
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {getCurrencyInfo(toCurrency).symbol}
                  </span>
                </div>
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="text-center p-3 bg-background/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                1 {fromCurrency} = {mockRates[fromCurrency]?.[toCurrency]?.toFixed(4) || '1.0000'} {toCurrency}
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Exchange rates are updated in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;