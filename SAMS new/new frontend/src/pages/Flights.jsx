import { Plane } from 'lucide-react';
import { flightsApi } from '../lib/api';
import ResourcePage from '../components/ResourcePage';

const badge = (s) => (
  <span
    className={`status ${
      s === 'Delayed'
        ? 'status-orange'
        : s === 'Boarding'
        ? 'status-green'
        : s === 'Cancelled'
        ? 'status-red'
        : 'status-blue'
    }`}
  >
    {s}
  </span>
);

export default function Flights() {
  return (
    <ResourcePage
      title="Flights"
      
      icon={Plane}
      api={flightsApi}
      searchKeys={[
        'flightNumber',
        'airline',
        'origin',
        'destination',
        'status',
      ]}
      fields={[
        {
          key: 'flightNumber',
          label: 'Flight Number',
        },
        {
          key: 'airline',
          label: 'Airline',
          type: 'select',
          options: [
            'IndiGo',
            'Air India',
            'SpiceJet',
            'Emirates',
          ],
        },
        {
          key: 'origin',
          label: 'Origin',
          type: 'select',
          options: [
            'DEL',
            'BOM',
            'BLR',
            'CCU',
          ],
        },
        {
          key: 'destination',
          label: 'Destination',
          type: 'select',
          options: [
            'HYD',
            'DEL',
            'BOM',
            'BLR',
          ],
        },
        {
          key: 'departureTime',
          label: 'Departure',
          type: 'datetime-local',
        },
        {
          key: 'arrivalTime',
          label: 'Arrival',
          type: 'datetime-local',
        },
        {
          key: 'gate',
          label: 'Gate',
          type: 'select',
          options: [
            'A1',
            'A3',
            'B1',
            'B6',
            'C4',
          ],
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          options: [
            'Scheduled',
            'Delayed',
            'Boarding',
            'Departed',
            'Arrived',
            'Cancelled',
          ],
        },
      ]}
      columns={[
        {
          key: 'flightNumber',
          label: 'Flight',
        },
        {
          key: 'airline',
          label: 'Airline',
        },
        {
          key: 'origin',
          label: 'From',
        },
        {
          key: 'destination',
          label: 'To',
        },
        {
          key: 'gate',
          label: 'Gate',
        },
        {
          key: 'status',
          label: 'Status',
          render: (r) => badge(r.status),
        },
        {
          key: 'departureTime',
          label: 'Departure',
          render: (r) =>
            new Date(r.departureTime).toLocaleString(),
        },
      ]}
    />
  );
}