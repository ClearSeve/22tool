import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Drawer, Input } from 'antd';
import Sider from '@/components/Sider';
const { Content, Footer } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import Menu from '@/components/Menu';
import Header from '@/components/Header';

export default function BasicLayout({ children, title = '', description = '', hideFooter = false }) {
  const [open, setOpen] = useState(false);
  const drawerIcon = open ? <MenuUnfoldOutlined className={styles.drawerIcon} /> : <MenuFoldOutlined className={styles.drawerIcon} />;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const siteTitle = title ? `${title} - 22在线工具箱` : '22在线工具箱';
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout hasSider className={styles.layoutMain}>
        <Sider />
        <Drawer placement="left" onClose={onClose} open={open} width="237px" bodyStyle={{ padding: "0" }}>
          <Menu />
        </Drawer>
        <Layout className={styles.layoutChild} >
          <Header />
          <Content className={styles.content}>
            {children}
          </Content>
          {!hideFooter && (
            <Footer className={styles.footer}>
              <Card>
                Copyright © 2023 在线工具箱 - All rights reserved.
              </Card>
            </Footer>
          )}
        </Layout>
      </Layout >
    </>
  );
};
