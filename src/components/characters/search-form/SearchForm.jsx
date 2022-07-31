import React from "react";
import {
  Field,
  Formik,
  Form,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import useMarvelService from "../../../services/MarvelService";
import ErrorMessage from "../../error-message/ErrorMessage";
import "./SearchForm.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="char__search-critical-error">
      <ErrorMessage />
    </div>
  ) : null;

  const results = !char ? null : char.length > null ? (
    <div className="char__search-wrapper">
      <div className="success">
        There is! Visit a {char[0].name + "'s"} page?
      </div>
      <Link to={`/${char[0].id}`} className="button button_grey">
        <div className="btn-inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <>
      <Formik
        initialValues={{ charName: "" }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}>
        <Form>
          <label htmlFor="charName">Or find a character by name:</label>
          <div className="input__wrapper">
            <Field
              name="charName"
              id="charName"
              type="text"
              placeholder="Enter name"
            />
            <button
              className="button button_search"
              type="submit"
              disabled={loading}>
              FIND
            </button>
          </div>
          <FormikErrorMessage
            name="charName"
            render={(msg) => <div className="error">{msg}</div>}
          />
          {results}
          {errorMessage}
        </Form>
      </Formik>
    </>
  );
};

export default SearchForm;
