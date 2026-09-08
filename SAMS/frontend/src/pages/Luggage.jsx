import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronRight,
  Search,
  X,
  Eye,
  RefreshCw,
  Plus,
} from "lucide-react";
import { flightsApi, luggageApi } from "../lib/api";

const statusBadge = (status) => {
  const value = String(status || "checked-in").toLowerCase();

  let cls = "status-green";

  if (value === "lost" || value === "missing") {
    cls = "status-red";
  } else if (value === "pending") {
    cls = "status-orange";
  } else if (value === "in-transit") {
    cls = "status-blue";
  }

  return (
    <span className={`status ${cls}`}>
      {status || "checked-in"}
    </span>
  );
};

const getFlightId = (flight) =>
  flight?._id || flight?.id || flight?.flightId || null;

const getFlightNumber = (flight) =>
  flight?.flightNumber || flight?.number || "—";

const getFlightDate = (flight) => {
  const value = flight?.departureTime || flight?.date;

  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getLuggageFlight = (item) => {
  if (!item?.flight) return null;

  if (typeof item.flight === "object") {
    return item.flight;
  }

  return null;
};

const emptyForm = {
  passengerName: "",
  flight: "",
  tag: "",
  weight: "",
  status: "checked-in",
  location: "",
};

export default function Luggage() {
  const [flights, setFlights] = useState([]);
  const [luggage, setLuggage] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedFlight, setSelectedFlight] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [flightResponse, luggageResponse] = await Promise.all([
        flightsApi.list(),
        luggageApi.list(),
      ]);

      setFlights(Array.isArray(flightResponse) ? flightResponse : []);

      setFlights(Array.isArray(flightResponse) ? flightResponse : []);
      setLuggage(Array.isArray(luggageResponse) ? luggageResponse : []);
    } catch (error) {
      console.error("Failed to load luggage data:", error);

      setFlights([]);
      setLuggage([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const flightRows = useMemo(() => {
    return flights
      .map((flight) => {
        const flightId = getFlightId(flight);
        const flightNumber = getFlightNumber(flight);

        const relatedLuggage = luggage.filter((item) => {
          const itemFlight = getLuggageFlight(item);

          if (itemFlight) {
            return (
              String(getFlightId(itemFlight)) === String(flightId) ||
              getFlightNumber(itemFlight) === flightNumber
            );
          }

          if (typeof item.flight === "string") {
            return String(item.flight) === String(flightId);
          }

          return false;
        });

        const total = relatedLuggage.length;

        const pending = relatedLuggage.filter(
          (item) =>
            String(item.status || "").toLowerCase() === "pending"
        ).length;

        const missing = relatedLuggage.filter((item) => {
          const status = String(item.status || "").toLowerCase();

          return status === "lost" || status === "missing";
        }).length;

        let status = "All Checked";

        if (missing > 0) {
          status = `${missing} Missing`;
        } else if (pending > 0) {
          status = `${pending} Pending`;
        }

        return {
          flight,
          flightId,
          flightNumber,
          date: getFlightDate(flight),
          origin: flight?.origin || "—",
          destination: flight?.destination || "—",
          passengers:
            flight?.passengers ||
            flight?.passengerCount ||
            flight?.totalPassengers ||
            "—",
          total,
          pending,
          missing,
          status,
          relatedLuggage,
        };
      })
      .filter((row) => {
        const q = search.trim().toLowerCase();

        if (!q) return true;

        return [
          row.flightNumber,
          row.flight?.airline,
          row.origin,
          row.destination,
          row.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
  }, [flights, luggage, search]);

  const openAddModal = () => {
    setForm(emptyForm);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    if (saving) return;

    setShowAddModal(false);
    setForm(emptyForm);
  };

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSaveLuggage = async (event) => {
    event.preventDefault();

    if (!form.passengerName.trim()) {
      alert("Please enter passenger name.");
      return;
    }

    if (!form.flight) {
      alert("Please select a flight.");
      return;
    }

    if (!form.tag.trim()) {
      alert("Please enter luggage tag.");
      return;
    }

    if (!form.weight) {
      alert("Please enter luggage weight.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        passengerName: form.passengerName.trim(),
        flight: form.flight,
        tag: form.tag.trim(),
        weight: Number(form.weight),
        status: form.status,
        location: form.location.trim(),
      };

      await luggageApi.create(payload);

      setShowAddModal(false);
      setForm(emptyForm);

      await loadData();

      alert("Luggage added successfully.");
    } catch (error) {
      console.error("Failed to add luggage:", error);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to add luggage."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="resource-page">
        <div className="resource-heading">
          <div className="resource-title">
            <div className="resource-icon">
              <BriefcaseBusiness size={28} />
            </div>

            <div>
              <h1>Luggage</h1>

              
            </div>
          </div>

          <div className="resource-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={loadData}
              title="Refresh"
            >
              <RefreshCw size={19} />
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={openAddModal}
            >
              <Plus size={19} />
              Add Luggage
            </button>
          </div>
        </div>

        <div className="section-card luggage-flight-card">
          

          <div className="resource-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search flights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table className="flight-table">
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>Date</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Passengers</th>
                  <th>Total Luggage</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      Loading flights...
                    </td>
                  </tr>
                ) : flightRows.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-state">
                      No flights found.
                    </td>
                  </tr>
                ) : (
                  flightRows.map((row) => (
                    <tr
                      key={row.flightId || row.flightNumber}
                      className="clickable-row"
                      onClick={() => setSelectedFlight(row)}
                    >
                      <td>
                        <strong>{row.flightNumber}</strong>
                      </td>

                      <td>{row.flight?.airline || "—"}</td>

                      <td>{row.date}</td>

                      <td>{row.origin}</td>

                      <td>{row.destination}</td>

                      <td>{row.passengers}</td>

                      <td>
                        <strong>{row.total}</strong>
                      </td>

                      <td>{statusBadge(row.status)}</td>

                      <td>
                        <button
                          type="button"
                          className="icon-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFlight(row);
                          }}
                          title="View luggage details"
                        >
                          <ChevronRight size={19} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =========================
          ADD LUGGAGE MODAL
      ========================= */}

      {showAddModal && (
        <div
          className="modal-backdrop"
          onClick={closeAddModal}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h3>Add Luggage</h3>

              <button
                type="button"
                onClick={closeAddModal}
                disabled={saving}
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSaveLuggage} className="form-grid">
              <label>
                <span>Passenger Name</span>
                <input
                  type="text"
                  value={form.passengerName}
                  onChange={(e) =>
                    updateForm("passengerName", e.target.value)
                  }
                  placeholder="Enter passenger name"
                  required
                />
              </label>

              <label>
                <span>Flight</span>
                <select
                  value={form.flight}
                  onChange={(e) => updateForm("flight", e.target.value)}
                  required
                >
                  <option value="">Select flight...</option>
                  {flights.map((flight) => {
                    const id = getFlightId(flight);
                    if (!id) return null;

                    return (
                      <option key={id} value={id}>
                        {getFlightNumber(flight)}
                        {" — "}
                        {flight.airline || "Airline"}
                        {" — "}
                        {flight.origin || "—"}
                        {" → "}
                        {flight.destination || "—"}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label>
                <span>Luggage Tag</span>
                <input
                  type="text"
                  value={form.tag}
                  onChange={(e) => updateForm("tag", e.target.value)}
                  placeholder="e.g. TAG123456"
                  required
                />
              </label>

              <label>
                <span>Weight (kg)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.weight}
                  onChange={(e) => updateForm("weight", e.target.value)}
                  placeholder="e.g. 25"
                  required
                />
              </label>

              <label>
                <span>Status</span>
                <select
                  value={form.status}
                  onChange={(e) => updateForm("status", e.target.value)}
                >
                  <option value="checked-in">checked-in</option>
                  <option value="in-transit">in-transit</option>
                  <option value="arrived">arrived</option>
                  <option value="claimed">claimed</option>
                  <option value="pending">pending</option>
                  <option value="lost">lost</option>
                </select>
              </label>

              <label>
                <span>Location</span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateForm("location", e.target.value)}
                  placeholder="e.g. DEL - T1"
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeAddModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          FLIGHT LUGGAGE DETAILS
      ========================= */}

      {selectedFlight && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedFlight(null)}
        >
          <div
            className="modal luggage-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  Luggage Details —{" "}
                  {selectedFlight.flightNumber}
                </h2>

                <p>
                  {selectedFlight.flight?.airline || "—"}{" "}
                  | {selectedFlight.origin} →{" "}
                  {selectedFlight.destination}{" "}
                  | {selectedFlight.date}
                </p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() => setSelectedFlight(null)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="luggage-summary-grid">
              <div className="luggage-summary-card">
                <strong>
                  {selectedFlight.passengers}
                </strong>

                <span>Passengers</span>
              </div>

              <div className="luggage-summary-card">
                <strong>
                  {selectedFlight.total}
                </strong>

                <span>Luggage Checked</span>
              </div>

              <div className="luggage-summary-card warning">
                <strong>
                  {selectedFlight.pending}
                </strong>

                <span>Pending</span>
              </div>

              <div className="luggage-summary-card danger">
                <strong>
                  {selectedFlight.missing}
                </strong>

                <span>Missing</span>
              </div>
            </div>

            <div className="resource-search luggage-detail-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search passenger, tag, status..."
                readOnly
              />
            </div>

            <div className="table-wrap luggage-detail-table">
              <table className="flight-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Passenger Name</th>
                    <th>Luggage Tag</th>
                    <th>Weight</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedFlight.relatedLuggage.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="empty-state"
                      >
                        No luggage records linked to
                        this flight yet.
                      </td>
                    </tr>
                  ) : (
                    selectedFlight.relatedLuggage.map(
                      (item, index) => (
                        <tr
                          key={
                            item._id ||
                            item.id ||
                            index
                          }
                        >
                          <td>{index + 1}</td>

                          <td>
                            <strong>
                              {item.passengerName ||
                                item.passenger?.name ||
                                item.passenger?.fullName ||
                                "—"}
                            </strong>
                          </td>

                          <td>
                            {item.tag ||
                              item.luggageTag ||
                              "—"}
                          </td>

                          <td>
                            {item.weight !==
                              undefined &&
                            item.weight !== null
                              ? `${item.weight} kg`
                              : "—"}
                          </td>

                          <td>
                            {statusBadge(
                              item.status
                            )}
                          </td>

                          <td>
                            {item.location || "—"}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="icon-button"
                              title="View"
                            >
                              <Eye size={17} />
                            </button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setSelectedFlight(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}