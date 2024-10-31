import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.scss";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const getPatientById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patients/get-profile`,{headers:{token}}
      );
      setPatient(response.data);
      setFormData({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
        phone_number: response.data.phone_number,
      });
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/patients/update-profile`, formData, {headers:{token}});
      setPatient(formData);
      setIsEditing(false);
      toast.success("Edit Successfull");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getPatientById();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <div className="bg-image2"></div>
      <div className="my-profile">
        <h2 className="my-profile__header">My Profile</h2>
        {isEditing ? (
          <form
            className="my-profile__form"
            onSubmit={(e) => {
              e.preventDefault();
              updatePatient(1);
            }}
          >
            <div>
              <label className="my-profile__label">First Name:</label>
              <input
                className="my-profile__input"
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="my-profile__label">Last Name:</label>
              <input
                className="my-profile__input"
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="my-profile__label">Email:</label>
              <input
                className="my-profile__input"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="my-profile__label">Phone Number:</label>
              <input
                className="my-profile__input"
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </div>
            <button
              className="my-profile__button my-profile__button--save"
              type="submit"
            >
              Save
            </button>
            <button
              className="my-profile__button my-profile__button--cancel"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="my-profile__form">
            <div className="my-profile__info">
              First Name: {patient.first_name}
            </div>
            <div className="my-profile__info">
              Last Name: {patient.last_name}
            </div>
            <div className="my-profile__info">Email: {patient.email}</div>
            <div className="my-profile__info">
              Phone: {patient.phone_number}
            </div>
            <button
              className="my-profile__edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProfile;
