import './App.css'
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { apiRequest, loginRequest } from "./authConfig";

const API_URL = "https://tmpa-fastapi-msal.azurewebsites.net";

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});

  async function getToken() {
    try {
      const response = await instance.acquireTokenSilent({
        ...apiRequest,
        account: account!,
      });
      return response.accessToken;
    } catch (error) {
      // fallback to interactive if silent fails
      const response = await instance.acquireTokenPopup(apiRequest);
      return response.accessToken;
    }
  }

  async function callWhoAmI() {
    const token = await getToken();
    const res = await fetch(`${API_URL}/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }

  async function callReadData() {
    const token = await getToken();
    const res = await fetch(`${API_URL}/read-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }

  async function callWriteData() {
    const token = await getToken();
    const res = await fetch(`${API_URL}/write-data`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sample: "data" }), // Adjust payload as needed
    });
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => instance.loginPopup(loginRequest)}>Login</button>
      ) : (
        <>
          <p>Welcome {account?.name}</p>
          <button onClick={() => instance.logoutPopup()}>Logout</button>
          <button onClick={callWhoAmI}>Call WhoAmI</button>
          <button onClick={callReadData}>Call Read Data</button>
          <button onClick={callWriteData}>Call Write Data</button>
        </>
      )}
    </div>
  );
}

export default App
