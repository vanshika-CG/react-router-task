import React, { useEffect, useState } from "react";
import axios from "axios";

// Create an Axios instance for API requests
const api = axios.create({
  baseURL: "https://bank-apis.justinclicks.com/API/V1/",
  headers: {
    "Content-Type": "application/json",
  },
});

function IndianBanks() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [banks, setBanks] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (url, setter, resetters = []) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(url);
      setter(response.data);

      // Reset dependent states if needed
      resetters.forEach((reset) => reset([]));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch available states
  useEffect(() => {
    fetchData("STATE/", setStates);
  }, []);

  // Fetch districts based on selected state
  useEffect(() => {
    if (selectedState) {
      fetchData(`STATE/${selectedState}/`, setDistricts, [setCities, setCenters, setBranches, setBanks]);
    }
  }, [selectedState]);

  // Fetch cities based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      fetchData(
        `STATE/${selectedState}/${selectedDistrict}/`,
        setCities,
        [setCenters, setBranches, setBanks]
      );
    }
  }, [selectedDistrict]);

  // Fetch centers based on selected city
  useEffect(() => {
    if (selectedCity) {
      fetchData(
        `STATE/${selectedState}/${selectedDistrict}/${selectedCity}/`,
        setCenters,
        [setBranches, setBanks]
      );
    }
  }, [selectedCity]);

  // Fetch branches based on selected center
  useEffect(() => {
    if (selectedCenter) {
      fetchData(
        `STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/`,
        setBranches,
        [setBanks]
      );
    }
  }, [selectedCenter]);

  // Fetch bank details for a branch
  const fetchBankDetails = async (branchName) => {
    if (!branchName) return;

    fetchData(
      `STATE/${selectedState}/${selectedDistrict}/${selectedCity}/${selectedCenter}/${branchName}.json`,
      setBanks
    );
  };

  // Download Excel file
  const downloadExcel = (bankName) => {
    window.location.href = `https://bank-apis.justinclicks.com/API/V1/Excel/${bankName}`;
  };

  return (
    <div>
      <h2>Indian Banks Directory</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* State Selector */}
      <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>

      {/* District Selector */}
      {selectedState && (
        <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      )}

      {/* City Selector */}
      {selectedDistrict && (
        <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      )}

      {/* Center Selector */}
      {selectedCity && (
        <select onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
          <option value="">Select Center</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>{center}</option>
          ))}
        </select>
      )}

      {/* Branch Selector */}
      {selectedCenter && (
        <select onChange={(e) => fetchBankDetails(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map((branch, index) => (
            <option key={index} value={branch}>{branch}</option>
          ))}
        </select>
      )}

      {/* Bank Details */}
      <ul>
        {banks.map((bank, index) => (
          <li key={index}>{bank.bankName} - IFSC: {bank.ifscCode}</li>
        ))}
      </ul>

      {/* Download Excel */}
      {banks.length > 0 && (
        <button onClick={() => downloadExcel(banks[0].bankName)}>Download Excel</button>
      )}
    </div>
  );
}

export default IndianBanks;
