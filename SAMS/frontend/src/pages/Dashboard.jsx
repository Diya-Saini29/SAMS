import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plane,
  BriefcaseBusiness,
  Users,
  Bus,
  ChevronDown,
  UserRound,
  BarChart3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useNavigate } from "react-router-dom";

import {
  flightsApi,
  luggageApi,
  visitorsApi,
  staffApi,
  transportApi,
} from "../lib/api";

import { useAuth } from "../context/AuthContext";

import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";


const palette = [
  "#B4B4B8",
  "#C7C8CC",
  "#E3E1D9",
  "#F2EFE5",
];


const demoFlights = [
  {
    flightNumber: "AI 203",
    airline: "Air India",
    origin: "DEL",
    destination: "BOM",
    gate: "A3",
    status: "Boarding",
    departureTime: "2025-04-15T14:30:00",
    arrivalTime: "2025-04-15T16:50:00",
  },
  {
    flightNumber: "6E 517",
    airline: "IndiGo",
    origin: "BLR",
    destination: "DEL",
    gate: "B1",
    status: "Scheduled",
    departureTime: "2025-04-15T15:10:00",
    arrivalTime: "2025-04-15T17:25:00",
  },
  {
    flightNumber: "SG 372",
    airline: "SpiceJet",
    origin: "CCU",
    destination: "BLR",
    gate: "C4",
    status: "Delayed",
    departureTime: "2025-04-15T16:20:00",
    arrivalTime: "2025-04-15T19:10:00",
  },
  {
    flightNumber: "EK 541",
    airline: "Emirates",
    origin: "DXB",
    destination: "DEL",
    gate: "A1",
    status: "Scheduled",
    departureTime: "2025-04-15T17:05:00",
    arrivalTime: "2025-04-15T18:45:00",
  },
  {
    flightNumber: "AI 679",
    airline: "Air India",
    origin: "MAA",
    destination: "DEL",
    gate: "B6",
    status: "Boarding",
    departureTime: "2025-04-15T18:10:00",
    arrivalTime: "2025-04-15T20:35:00",
  },
];


const statusClass = (status) =>
  ({
    Scheduled: "status-blue",
    Boarding: "status-green",
    Delayed: "status-orange",
    Departed: "status-gray",
    Arrived: "status-green",
    Cancelled: "status-red",
  }[status] || "status-gray");


const time = (date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });


export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    f: [],
    l: [],
    v: [],
    s: [],
    t: [],
  });


  useEffect(() => {
    let live = true;

    Promise.allSettled([
      flightsApi.list(),
      luggageApi.list(),
      visitorsApi.list(),
      staffApi.list(),
      transportApi.list(),
    ]).then((results) => {
      if (!live) return;

      const getData = (index) =>
        results[index].status === "fulfilled"
          ? results[index].value.data.data || []
          : [];

      setData({
        f: getData(0),
        l: getData(1),
        v: getData(2),
        s: getData(3),
        t: getData(4),
      });
    });

    return () => {
      live = false;
    };
  }, []);


  const flights = data.f.length ? data.f : demoFlights;

  const bagCount =
    data.l.length || 18450;

  const visitorCount =
    data.v.length || 21320;

  const staffCount =
    data.s.filter(
      (item) => item.status === "Active"
    ).length || 286;

  const transportCount =
    data.t.filter(
      (item) => item.status === "In Transit"
    ).length || 54;


  const bars = useMemo(
    () =>
      [
        2.2,
        3.7,
        4.8,
        6.9,
        7.4,
        5.9,
        4.5,
        3.5,
        4.8,
        5.5,
        6.0,
        4.4,
        3.4,
        2.3,
      ].map((value, index) => ({
        time: [
          "6:00",
          "7:00",
          "8:00",
          "9:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
        ][index],
        value,
      })),
    []
  );


  const pie = [
    {
      name: "Checked In",
      value: 58,
    },
    {
      name: "In Transit",
      value: 26,
    },
    {
      name: "Arrived",
      value: 12,
    },
    {
      name: "Lost / Delayed",
      value: 4,
    },
  ];


  return (
    <div className="dashboard fade-in">

      {/* ================= WELCOME ================= */}
      <div className="welcome">

        <div>
          <h1>Welcome back, John!</h1>

          <p>
            Here's what's happening at the airport today.
          </p>
        </div>

        <div className="quote">
          “Connecting People,
          <br />
          Creating Possibilities”
          <Plane size={27} />
        </div>

      </div>


      {/* ================= STAT CARDS ================= */}
      <div className="stats-grid">

        <StatCard
          icon={Plane}
          label="Total Flights Today"
          value="312"
          note="12% from yesterday"
          kind="blue"
        >
          <div className="trend-line">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </StatCard>


        <StatCard
          icon={BriefcaseBusiness}
          label="Baggage Handled"
          value={bagCount.toLocaleString()}
          note="8% from yesterday"
          kind="gray"
        >
          <div className="mini-bars">
            <i />
            <i />
            <i />
            <i />
          </div>
        </StatCard>


        <StatCard
          icon={Users}
          label="Terminal Visitors"
          value={visitorCount.toLocaleString()}
          note="15% from yesterday"
          kind="sand"
        >
          <div className="mini-bars warm">
            <i />
            <i />
            <i />
            <i />
          </div>
        </StatCard>


        <StatCard
          icon={Bus}
          label="Transport Utilization"
          value="76%"
          note="6% from yesterday"
          kind="cream"
        >
          <div className="donut-small" />
        </StatCard>

      </div>


      {/* ================= MAIN DASHBOARD ================= */}
      <div className="dashboard-main">

        {/* LIVE FLIGHTS */}
        <SectionCard
          title="Live Flight Schedule"
          icon={Plane}
          action={
            <button
              className="view-all"
              onClick={() => navigate("/flights")}
              type="button"
            >
              View All
            </button>
          }
        >

          <div className="flight-table-scroll">

            <table className="flight-table">

              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Gate</th>
                  <th>Status</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                </tr>
              </thead>

              <tbody>

                {flights
                  .slice(0, 5)
                  .map((flight, index) => (

                    <tr
                      key={
                        flight._id ||
                        flight.flightNumber ||
                        index
                      }
                    >

                      <td className="flight-name">
                        {flight.flightNumber}
                      </td>

                      <td>
                        {flight.airline}
                      </td>

                      <td>
                        {flight.origin}
                      </td>

                      <td>
                        {flight.destination}
                      </td>

                      <td>
                        {flight.gate || "—"}
                      </td>

                      <td>
                        <span
                          className={`status ${statusClass(
                            flight.status
                          )}`}
                        >
                          {flight.status === "Scheduled"
                            ? "On Time"
                            : flight.status}
                        </span>
                      </td>

                      <td>
                        {time(flight.departureTime)}
                      </td>

                      <td>
                        {time(flight.arrivalTime)}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </SectionCard>


        {/* ================= RIGHT SIDE ================= */}
        <div className="side-stack">

          {/* PASSENGER FLOW */}
          <SectionCard
            title="Terminal Passenger Flow"
            icon={BarChart3}
            action={
              <button
                className="select-chip"
                type="button"
              >
                Today
                <ChevronDown size={15} />
              </button>
            }
          >

            <div className="chart-box">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={bars}
                  margin={{
                    top: 6,
                    right: 5,
                    left: -16,
                    bottom: 0,
                  }}
                >

                  <XAxis
                    dataKey="time"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{
                      stroke: "#d8dce2",
                    }}
                  />

                  <YAxis
                    fontSize={10}
                    tickLine={false}
                    axisLine={{
                      stroke: "#d8dce2",
                    }}
                    tickFormatter={(value) =>
                      `${value}K`
                    }
                    domain={[0, 8]}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(199,200,204,.16)",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    fill="#B4B4B8"
                    radius={[3, 3, 0, 0]}
                    barSize={18}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </SectionCard>


          {/* BAGGAGE STATUS */}
          <SectionCard
            title="Baggage Status"
            icon={BriefcaseBusiness}
            action={
              <button
                className="select-chip"
                type="button"
              >
                Today
                <ChevronDown size={15} />
              </button>
            }
          >

            <div className="baggage-box">

              <div className="donut-wrap">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <PieChart>

                    <Pie
                      data={pie}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={65}
                      paddingAngle={1}
                      startAngle={90}
                      endAngle={-270}
                    >

                      {pie.map((item, index) => (
                        <Cell
                          key={item.name}
                          fill={palette[index]}
                        />
                      ))}

                    </Pie>

                  </PieChart>

                </ResponsiveContainer>


                <div className="donut-center">

                  <strong>
                    {bagCount.toLocaleString()}
                  </strong>

                  <span>
                    Total Bags
                  </span>

                </div>

              </div>


              <div className="legend">

                {pie.map((item, index) => (

                  <div key={item.name}>

                    <i
                      style={{
                        background:
                          palette[index],
                      }}
                    />

                    <span>
                      {item.name}
                    </span>

                    <b>
                      {item.value}%
                    </b>

                  </div>

                ))}

              </div>

            </div>

          </SectionCard>

        </div>

      </div>


      {/* ================= BOTTOM CARDS ================= */}
      <div className="bottom-grid">

        <Mini
          label="Staff On-Duty"
          icon={UserRound}
          value={staffCount}
          sub="of 350 scheduled"
          pct="82%"
        />

        <Mini
          label="Active Visitors"
          icon={Users}
          value={visitorCount.toLocaleString()}
          sub="in terminal"
          pct="76%"
        />

        <Mini
          label="Transport Services"
          icon={Bus}
          value={transportCount}
          sub="cars & shuttles active"
          pct="68%"
        />


        {/* JOURNEY CARD */}
        <div className="journey-card">

          <div className="journey-art">
            <div className="cloud c1" />
            <div className="cloud c2" />
            <div className="tower" />

            <div className="plane-mini">
              <Plane size={24} />
            </div>
          </div>

          <div className="journey-copy">
            Efficient Operations.
            <br />
            <strong>
              Happier Journeys.
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}


function Mini({
  label,
  icon: Icon,
  value,
  sub,
  pct,
}) {
  return (
    <div className="mini-card card">

      <div className="mini-head">
        <Icon size={24} />
        <strong>{label}</strong>
      </div>

      <div className="mini-number">
        <b>{value}</b>
        <span>{sub}</span>
      </div>

      <div className="progress-row">

        <div className="progress">
          <span
            style={{
              width: pct,
            }}
          />
        </div>

        <small>{pct}</small>

      </div>

    </div>
  );
}