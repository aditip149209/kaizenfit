import Card from "./Card";
import Chart from "./Chart";
import MapWidget from "./MapWidget";

const DashboardGrid = () => {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card title="Revenue" value="$1023" />
      <Card title="Users" value="198" />
      <Chart />
      <MapWidget />
    </div>
  );
};

export default DashboardGrid;
