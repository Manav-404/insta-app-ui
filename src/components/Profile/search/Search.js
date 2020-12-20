import React, { useState } from "react";
import { useParams, Redirect, Link } from "react-router-dom";
import { useEffect } from "react";
import "../Profile.css";
import ImageHelper from "../../ImageHelper/ImageHelper";
import { Button } from "@material-ui/core";
import Header from "../../Header/Header";
import { getProfilesBySearch } from "../helper/profileHelper";
import { isAuthenticated } from "../../Authentication/helper/authenticationHelper";

const Search = () => {
  const { key } = useParams();
  const { token } = isAuthenticated();
  const [profiles, setProfiles] = useState([]);

  const getProfiles = () => {
    getProfilesBySearch(key, token)
      .then((data) => {
        if (data.error) {
          return;
        } else {
          setProfiles(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfiles();
  }, [key]);

  const redirect = (id) => {
    return <Redirect to={`/profile/view/${id}`} />;
  };

  const loadProfiles = () => {
    if (profiles.length > 0) {
      return (
        <div>
          {profiles.map((profile, index) => {
            return (
              <div className="search__list" key={index}>
                <div className="search__item">
                  <div className="search__avatar">
                    <ImageHelper
                      size="medium"
                      id={profile._id}
                      id={profile._id}
                    />
                  </div>
                  <div
                    className="search__username"
                    onClick={() => redirect(profile._id)}
                  >
                    <Link
                      className="search__link"
                      to={`/profile/view/${profile._id}`}
                    >
                      <b>{profile.username}</b>
                    </Link>
                    <div>{profile.name}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h4>No profiles found</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="search">
        <div className="search__container">{loadProfiles()}</div>
      </div>
    </div>
  );
};

export default Search;
