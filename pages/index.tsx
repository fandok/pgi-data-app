import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Skeleton,
  Typography,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import useSWRInfinite from "swr/infinite";

import styles from "../styles/home.module.css";

import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import MainLayout from "../components/Layout";
import { LIST_API } from "../constants/api";
import cleanObject from "../helpers/cleanObject";
import fetcher from "../helpers/fetcher";
import { FilterFormInterface, ListResponse } from "../types";

dayjs.extend(relativeTime);

export default function Home() {
  const router = useRouter();
  const [form] = Form.useForm<FilterFormInterface>();

  const getKey = (pageIndex: number, previousPageData: ListResponse[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${LIST_API}?page=${pageIndex + 1}&${queryString.stringify(
      router.query
    )}`; // SWR key
  };

  const handleFinish = (values: FilterFormInterface) => {
    const newValues = cleanObject(values);

    if (newValues.full_time && newValues.full_time.length) {
      newValues.full_time = newValues.full_time[0];
    } else {
      delete newValues.full_time;
    }

    router.push({ query: newValues });
  };

  const { data, size, setSize, error, isLoading, isValidating } =
    useSWRInfinite<ListResponse[]>(getKey, fetcher);

  return (
    <MainLayout>
      <Form onFinish={handleFinish} form={form} layout="vertical">
        <Row className={styles.header} gutter={[4, 4]}>
          <Col span={6}>
            <Form.Item name="description" label={<b>Job Description</b>}>
              <Input
                prefix={<GlobalOutlined />}
                placeholder="Job title, Benefits, etc.."
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="location" label={<b>Location</b>}>
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Remote, Europe, etc.."
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="full_time">
              <Checkbox.Group>
                <Checkbox value={true}>Full Time Only</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item className={styles.submitButton}>
              <Button htmlType="submit">Search</Button>
            </Form.Item>
          </Col>
          {/* <Col span={6}>
            
          </Col> */}
        </Row>
      </Form>
      <div className={styles.items}>
        {data?.map((batch) =>
          batch.map((item) => {
            if (!item) {
              return;
            }

            return (
              <Fragment key={item.id}>
                <Link className={styles.item} href={`/detail/${item.id}`}>
                  <div>
                    <Typography.Title level={5}>{item.title}</Typography.Title>
                    <div>
                      <span>{item.company}</span> - <b>{item.type}</b>
                    </div>
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.itemLocation}>{item.location}</div>
                    <div>{dayjs(item.created_at).fromNow()}</div>
                  </div>
                </Link>
                <Divider />
              </Fragment>
            );
          })
        )}
        {!error && (
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setSize(size + 1);
                }}
              >
                Load More
              </Button>
            </Col>
          </Row>
        )}
        {(isLoading || isValidating) && <Skeleton />}
      </div>
    </MainLayout>
  );
}
