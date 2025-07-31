import Header from '@/components/common/header';
import SIMOverview from '@/components/dashboard/SimStatusOverview/sim-status-overview';
import TimeOverviewChart from '@/components/dashboard/TimeOverview/time-overview';
import CurrentConsumption from '@/components/dashboard/CurrentConsumption/current-consumption';
import TopConsumptions from '@/components/dashboard/TopConsumptions/TopConsumptionsList';
import Footer from '@/components/common/footer';

export default function Dashboard() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F2F8F9' }}>
            <div className="p-6 space-y-6">
                <Header title="Dashboard" />
                <SIMOverview />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <TimeOverviewChart />
                    <CurrentConsumption />
                    <TopConsumptions />
                </div>
                <Footer />
            </div>
        </div>
    );
}
