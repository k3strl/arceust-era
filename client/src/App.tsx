import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Button, ConfigProvider, Layout } from 'antd';
import Auth from "./utils/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavOptions from "./components/Menu";
import arecuestlogo from "./assets/arceusteralogotransparent.png";
import { User } from "./components/User"
import { LogoutOutlined } from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [domLoad, setDomLoad] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setDomLoad(false);
    if (window.innerWidth <= 768) {
      setMobile(true);
    }
    setDomLoad(true);
    const handleResize = () => setMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useLayoutEffect(() => {
    const loggedIn = Auth.loggedIn();
    if (loggedIn === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const logout = () => {
    Auth.logout();
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <ApolloProvider client={client}>
      {domLoad &&
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                triggerBg: "#682222",
              },
              Card: {

              },
              Button: {
                defaultBg: "#682222",
                defaultHoverBg: "#FFFFFF",
                defaultHoverBorderColor: "#FFFFFF",
                defaultHoverColor: "#000000"
              },
            },
            token: {
              colorBgContainer: "#000000",
              colorText: "#FFFFFF",
            }
          }}
        >
          <Layout style={{ minHeight: '100vh' }} >
            {mobile ?
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={!collapsed ? { background: "black", padding: "1rem" } : { background: "black" }} theme="dark" breakpoint="md" collapsedWidth={0} zeroWidthTriggerStyle={{ background: "#682222", marginTop: "1rem" }}>
                <img src={arecuestlogo} alt="Areuest Era" style={{ width: "4rem", height: "4rem", margin: "1rem" }} />
                {isLoggedIn && !collapsed &&
                  <>
                    <User />
                    <Button
                      key="logout"
                      variant="solid"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={() => logout()}
                    >
                      <LogoutOutlined /> Logout
                    </Button>
                  </>
                }
                <NavOptions />
              </Sider>
              :
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: "black" }} theme="dark">
                <img src={arecuestlogo} alt="Areuest Era" style={{ width: "4rem", height: "4rem", margin: "1rem" }} />
                {isLoggedIn && !collapsed &&
                  <>
                    <User />
                    <Button
                      key="logout"
                      variant="solid"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={() => logout()}
                    >
                      <LogoutOutlined /> Logout
                    </Button>
                  </>
                }
                {isLoggedIn && collapsed &&
                  <>
                    <User />
                    <Button
                      key="logout"
                      variant="solid"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={() => logout()}
                    >
                      <LogoutOutlined />
                    </Button>
                  </>
                }
                <NavOptions />
              </Sider>
            }
            <Layout>
              <Content style={collapsed ? { margin: '0' } : { margin: '0', minHeight: "490px" }}>
                <Outlet />
              </Content>
              <Footer style={{ background: "black", color: "white", textAlign: 'center', padding: 0, paddingBottom: "1rem" }}>
                Arceust Era © 2025 - {new Date().getFullYear()} <br />
                Created with love by <a href="https://github.com/jsparrowio">jsparrowio</a>, <a href="https://github.com/zlacore">zlacore</a>, <a href="https://github.com/k3strl">k3strl</a>, and <a href="https://github.com/KTek4">KTek4</a>
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      }
    </ApolloProvider>

  );
}

export default App;
