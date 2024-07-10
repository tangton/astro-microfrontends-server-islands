import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  onElementChange?: () => void;
}

class PersonalDetails {
  email = "";
  firstName = "";
  lastName = "";
}

function CustomerSearch(props: Props) {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(new PersonalDetails());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [personalDetailsSearchResult, setPersonalDetailsSearchResult] = useState<PersonalDetails[]>([]);

  useEffect(() => {
    if (props.onElementChange) {
      props.onElementChange();
    }

  }, [personalDetails]);

  return (
    <div className="flex flex-col justify-center gap-2 mb-5">
      <div>
        <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
          id="inputEmail"
          placeholder="Enter your email"
          value={personalDetails.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPersonalDetails(state => (
              {
                ...state,
                email: e.target.value
              }
            ));
          }}
        />
      </div>
      <div>
        <label htmlFor="firstName" className="form-label inline-block mb-2 text-gray-700">First name</label>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
          id="inputFirstName"
          placeholder="Enter your first name"
          value={personalDetails.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPersonalDetails(state => (
              {
                ...state,
                firstName: e.target.value
              }
            ));
          }}
        />
      </div>
      <div>
        <label htmlFor="lastName" className="form-label inline-block mb-2 text-gray-700">Last name</label>
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
          id="inputLastName"
          placeholder="Enter your last name"
          value={personalDetails.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPersonalDetails(state => (
              {
                ...state,
                lastName: e.target.value
              }
            ));
          }}
        />
      </div>
      {errorMessage &&
        <div>
          {errorMessage}
        </div>
      }
      <div className="sm:ml-auto">
        <button disabled={isSubmitting} type="button" onClick={async () => {
          setErrorMessage("");
          setIsSubmitting(true);

          try {
            var response = await axios.get('https://ahufyw9gl7.execute-api.ap-southeast-2.amazonaws.com/customer', {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            });

            if (response.data) {
              setPersonalDetailsSearchResult(response.data);
            }
            else {

            }
          }
          catch (error: unknown) {
            setErrorMessage(JSON.stringify(error))
          }

          setIsSubmitting(false);
        }}
          className="inline-block h-10 px-6 py-2.5 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out !important w-full sm:w-auto">
          {isSubmitting ?
            <div className="flex items-center justify-center space-x-2">
              <div className="inline-block w-4 h-4 border-1 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> :
            "Next"
          }
        </button>
      </div>
      {personalDetailsSearchResult && personalDetailsSearchResult.length > 0 &&
        <table className="table-auto bborder-separate border-spacing-2 border border-slate-400">
          <thead>
            <tr>
              <th className='border border-slate-300'>Email</th>
              <th className='border border-slate-300'>First name</th>
              <th className='border border-slate-300'>Last name</th>
            </tr>
          </thead>
          <tbody>
            {personalDetailsSearchResult.map(x =>
              <tr key={x.email}>
                <td className='border border-slate-300'>{x.email}</td>
                <td className='border border-slate-300'>{x.firstName}</td>
                <td className='border border-slate-300'>{x.lastName}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default CustomerSearch
