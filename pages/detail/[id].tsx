import { useRouter } from "next/router";
import useSWR from "swr";

import { MAIN_API } from "../../constants/api";
import fetcher from "../../helpers/fetcher";
import { DetailResponse } from "../../types/detail";
import styles from "../../styles/detail.module.css";
import Image from "next/image";
import MainLayout from "../../components/Layout";
import { Breadcrumb, Divider, Typography } from "antd";
import Link from "next/link";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR<DetailResponse>(
    id ? `${MAIN_API}/${id}` : null,
    fetcher
  );

  return (
    <MainLayout>
      <Breadcrumb style={{ marginTop: 10 }}>
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.header}>
        <div>
          <span>{data?.type}</span> / <span>{data?.location}</span>
        </div>
        <Typography.Title level={4}>{data?.title}</Typography.Title>
      </div>
      <Divider />
      <div className={styles.content}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: data?.description || "" }}
        />
        <div className={styles.application}>
          <div className={styles.company}>
            <Typography.Title level={5}>{data?.company}</Typography.Title>
            <Image
              alt="company-logo"
              src={"https://picsum.photos/200"}
              width={200}
              height={200}
            />
            <a className={styles.companyUrl} href={data?.company_url}>
              {data?.company_url}
            </a>
          </div>
          <div className={styles.howToApply}>
            <Typography.Title level={5}>How To Apply</Typography.Title>
            <Divider />
            <div
              dangerouslySetInnerHTML={{ __html: data?.how_to_apply || "" }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Detail;
