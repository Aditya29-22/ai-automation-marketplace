import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { automation_id, hours_per_week, hourly_rate, workdays_per_month } = await request.json();

    if (!automation_id) {
      return NextResponse.json({ error: 'Automation ID required' }, { status: 400 });
    }

    const automation = products.find(p => p.id === automation_id);
    if (!automation) {
      return NextResponse.json({ error: 'Automation not found' }, { status: 404 });
    }

    // Parse time saved from automation data
    const timeSavedStr = automation.roiMetrics.timeSaved;
    let hoursSavedPerDay = 0;
    const hoursMatch = timeSavedStr.match(/([\d.]+)\s*hr/i);
    if (hoursMatch) hoursSavedPerDay = parseFloat(hoursMatch[1]);

    // Use provided inputs or defaults
    const weeklyHours = hours_per_week || (hoursSavedPerDay * 5);
    const rate = hourly_rate || 500;
    const workdays = workdays_per_month || 22;

    // Calculations
    const monthlyHoursSaved = hoursSavedPerDay * workdays;
    const monthlySavings = monthlyHoursSaved * rate;
    const yearlySavings = monthlySavings * 12;
    const investmentCost = automation.price;
    const roiPercentage = investmentCost > 0
      ? Math.round(((yearlySavings - investmentCost) / investmentCost) * 100)
      : Infinity;
    const paybackDays = investmentCost > 0
      ? Math.ceil(investmentCost / (monthlySavings / 30))
      : 0;

    return NextResponse.json({
      automation: {
        id: automation.id,
        name: automation.name,
        price: automation.price,
        timeSaved: automation.roiMetrics.timeSaved,
      },
      calculations: {
        hoursSavedPerDay,
        monthlyHoursSaved: Math.round(monthlyHoursSaved * 10) / 10,
        monthlySavings: Math.round(monthlySavings),
        yearlySavings: Math.round(yearlySavings),
        roiPercentage,
        paybackDays,
        roiMultiple: investmentCost > 0 ? Math.round(yearlySavings / investmentCost * 10) / 10 : 0,
      },
      inputs: {
        hoursPerWeek: weeklyHours,
        hourlyRate: rate,
        workdaysPerMonth: workdays,
      },
    });
  } catch (error: any) {
    console.error('ROI calculator error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
