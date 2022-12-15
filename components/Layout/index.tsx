import { Button, Layout, Space, Typography } from "antd";
import styles from "../../styles/layout.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

const { Header, Content, Footer } = Layout;

const AUTHENTICATED = "authenticated";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <Layout>
      <Header className={styles.header}>
        <Typography.Title className={styles.title}>PGI Data</Typography.Title>
        <Space>
          {session && (
            <div>
              <span>{session.user?.name}</span> -{" "}
              <span>{session.user?.email}</span>
            </div>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              isAuthenticated ? signOut() : signIn();
            }}
            type="primary"
          >
            {isAuthenticated ? "Sign Out" : "Sign In"}
          </Button>
        </Space>
      </Header>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>© PGI Data App, Made by @fandok</Footer>
    </Layout>
  );
};

export default MainLayout;
