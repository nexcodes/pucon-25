import { CarbonCalculator } from "./_components/carbon-calculator";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        EcoMate Carbon Footprint Calculator
      </h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Track your carbon emissions by logging your daily activities across
        transport, energy usage, and food consumption. See your impact and
        discover ways to reduce your carbon footprint.
      </p>
      <CarbonCalculator />
    </main>
  );
}
