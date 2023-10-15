import {
  QueryForm,
  Table,
  Modal,
  Property,
  Select,
  Tabs,
  Form,
  ControlContainer,
  Button,
  Container,
  Page,
  RadioGroup,
  notification,
  message,
  Input,
} from "antd";
export default () => {
  return (
    <Page
      style={{
        backgroundColor: "#F0F1F4",
        paddingBottom: "0px",
        paddingRight: "0px",
        paddingTop: "0px",
        paddingLeft: "0px",
      }}
    >
      <Modal
        visible={!!auditRecord.value}
        okType="primary"
        getContainer={false}
        onCancel={async (...rest) => {
          const result = [];
          const actionsList = [
            async (...rest) =>
              Promise.resolve(
                (async () => auditRecord.setValue(null))(...rest)
              ),
          ];
          for (const action of actionsList) {
            result.push(await action(...rest));
          }
          return result;
        }}
        width={600}
        destroyOnClose={true}
        hasFooter={true}
        title="审核"
        onOk={async (...rest) => {
          const result = [];
          const actionsList = [
            async (...rest) =>
              Promise.resolve((async () => form1.submit())(...rest)),
          ];
          for (const action of actionsList) {
            result.push(await action(...rest));
          }
          return result;
        }}
      >
        <Form
          layout="horizontal"
          labelAlign="right"
          wrapperCol={{
            span: 18,
          }}
          onSubmit={async (...rest) => {
            const result = [];
            const actionsList = [
              async (...rest) =>
                Promise.resolve(
                  (async (values) =>
                    doAuditApi
                      .trigger({
                        data: {
                          ...values,
                          uuid: auditRecord.value.uuid,
                          sourceType: currentTab.value,
                        },
                      })
                      .then(() => {
                        auditRecord.setValue(null);
                        const refresh = {
                          101: rulesQuery.trigger,
                          102: modelQuery.trigger,
                          103: funcQuery.trigger,
                          104: decisionQuery.trigger,
                        }[currentTab.value];
                        refresh?.();
                      }))(...rest)
                ),
            ];
            for (const action of actionsList) {
              result.push(await action(...rest));
            }
            return result;
          }}
          values={{
            operResult: "1",
          }}
          colon={true}
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item name="operResult" label="审批结果" required={true}>
            <RadioGroup
              options={[
                {
                  label: "同意",
                  value: "1",
                },
                {
                  label: "拒绝",
                  value: "0",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="remark"
            rules={[
              {
                ruleType: "required",
                message: "请输入审批意见",
                required: true,
              },
              {
                min: 2,
                max: 200,
                ruleType: "lengthRange",
                message: "描述长度2~200个字符",
              },
            ]}
            label="审批意见"
            required={true}
          >
            <Input.TextArea
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
              style={{
                marginTop: "10px",
              }}
              placeholder="请输入审批意见，200字以内；"
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={!!detailRecord.value}
        okType="primary"
        getContainer={false}
        onCancel={async (...rest) => {
          const result = [];
          const actionsList = [
            async (...rest) =>
              Promise.resolve(
                ((...rest) => {
                  return detailRecord.setValue(null);
                })(...rest)
              ),
          ];
          for (const action of actionsList) {
            result.push(await action(...rest));
          }
          return result;
        }}
        width={650}
        destroyOnClose={true}
        hasFooter={false}
        title="查看详情"
      >
        <Property
          mode="table"
          size="default"
          column={2}
          titleWidth={160}
          dataSource={[
            {
              label: "名称",
              content: detailRecord.value?.name,
            },
            {
              label: "状态",
              type: "tag",
              content: detailRecord.value.statusName,
              props: {
                color: statusMap.value?.[detailRecord.value?.status],
              },
            },
            {
              label: "申请人",
              content: detailRecord.value?.operator,
            },
            {
              label: "审批人",
              content: detailRecord.value?.auditUser,
            },
            {
              label: "申请时间",
              type: "dateTime",
              content: detailRecord.value?.operatorTime,
            },
            {
              label: "审批时间",
              type: "dateTime",
              content: detailRecord.value?.auditTime,
            },
            {
              label: "渠道",
              content: detailRecord.value?.appName,
            },
          ]}
          titleAlign="right"
        />
      </Modal>
      <Tabs
        tabBarStyle={{
          backgroundColor: "#fff",
          marginBottom: "0",
          paddingLeft: "20px",
        }}
        size="default"
        onChange={async (...rest) => {
          const result = [];
          const actionsList = [
            async (...rest) =>
              Promise.resolve(
                (async (activeKey) => {
                  currentTab.setValue(activeKey);
                  if (activeKey === "101") {
                    rulesQuery.trigger();
                  } else if (activeKey === "102") {
                    modelQuery.trigger();
                  } else if (activeKey === "103") {
                    funcQuery.trigger();
                  } else if (activeKey === "104") {
                    decisionQuery.trigger();
                  }
                })(...rest)
              ),
          ];
          for (const action of actionsList) {
            result.push(await action(...rest));
          }
          return result;
        }}
        activeKey={currentTab.value}
        tabPosition="top"
        type="inline"
        defaultActiveKey={101}
      >
        <Tabs.TabPane tab="规则集" key="101">
          <Container
            waterMarkProps={{
              rotate: -22,
              gapX: 200,
              gapY: 100,
              textAlign: "center",
              fontSize: 14,
              fontStyle: "normal",
              content: ["墨方-低代码平台", "同盾科技"],
              fontWeight: "normal",
              fontColor: "rgba(0,0,0,.15)",
              zIndex: 9,
            }}
            style={{
              backgroundColor: "",
              paddingBottom: "16px",
              paddingRight: "20px",
              paddingTop: "16px",
              paddingLeft: "20px",
            }}
          >
            <QueryForm
              defaultExpand={false}
              showSearch={true}
              onSearch={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return rulesQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              onReset={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return rulesQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              showReset={true}
            >
              <Form.Item name="status">
                <Select
                  options={auditStatusEnum.value}
                  placeholder="请选择"
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item name="name">
                <Input placeholder="请输入规则集名称" />
              </Form.Item>
            </QueryForm>
            <Table
              pagination={{
                current: rulesQuery.data?.curPage,
                total: rulesQuery.data?.total,
                pageSizeOptions: ["10", "20", "30", "40"],
                onChange: async (...rest) => {
                  const result = [];
                  const actionsList = [
                    async (...rest) =>
                      Promise.resolve(
                        (async (page, pageSize) =>
                          rulesQuery.trigger({
                            params: {
                              curPage: page,
                              pageSize,
                            },
                          }))(...rest)
                      ),
                  ];
                  for (const action of actionsList) {
                    result.push(await action(...rest));
                  }
                  return result;
                },
                hideOnSinglePage: false,
                pageSize: 10,
                position: "bottom",
                showQuickJumper: false,
                showSizeChanger: false,
                showTotal: (total, range) => {
                  return `共${total}条记录`;
                },
              }}
              expandRowByClick={false}
              actionColumnPosition="right"
              columns={[
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "name",
                  valueType: "text",
                  width: 200,
                  fixed: "left",
                  title: "规则集名称",
                  align: "left",
                  key: "name",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{record.statusName}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  statusColor: {
                    args: ["self", "record", "index"],
                    src: "{{statusMap.value[self] || 'geekblue'}}",
                    _$t_$: "function",
                  },
                  dataIndex: "status",
                  valueType: "status",
                  width: 140,
                  title: "审核状态",
                  align: "left",
                  key: "age",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  dataIndex: "operator",
                  valueType: "text",
                  width: 140,
                  title: "申请人",
                  align: "left",
                  key: "address",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "operatorTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "申请时间",
                  align: "left",
                  ellipsis: true,
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "auditUser",
                  valueType: "text",
                  width: 140,
                  title: "审批人",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "auditTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "审批时间",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "appName",
                  valueType: "text",
                  width: 160,
                  title: "所属渠道",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "ops",
                  valueType: "custom",
                  width: 120,
                  fixed: "right",
                  title: "操作",
                  align: "left",
                  render: {
                    args: ["self", "record", "index"],
                    src: "tableHandle",
                    _$t_$: "schema",
                    props: {
                      onView: "{{detailRecord.setValue}}",
                      currentRecord: "{{record}}",
                      onAudit: "{{auditRecord.setValue}}",
                    },
                  },
                },
              ]}
              showHeader={true}
              defaultExpandAllRows={false}
              bordered={false}
              loading={rulesQuery.isFetching}
              locale={{
                filterReset: "重置",
                emptyText: "暂无数据",
                filterConfirm: "确定",
              }}
              size="middle"
              actionColumnAlign="left"
              actionColumnFixed="right"
              actionColumnTitle="操作"
              actionColumnWidth={220}
              indentSize={15}
              dataSource={rulesQuery.data?.contents}
              scrollX={1000}
              rowKey="uuid"
            />
          </Container>
        </Tabs.TabPane>
        <Tabs.TabPane tab="模型" key="102">
          <Container
            waterMarkProps={{
              rotate: -22,
              gapX: 200,
              gapY: 100,
              textAlign: "center",
              fontSize: 14,
              fontStyle: "normal",
              content: ["墨方-低代码平台", "同盾科技"],
              fontWeight: "normal",
              fontColor: "rgba(0,0,0,.15)",
              zIndex: 9,
            }}
            style={{
              backgroundColor: "",
              paddingBottom: "16px",
              paddingRight: "20px",
              paddingTop: "16px",
              paddingLeft: "20px",
            }}
          >
            <QueryForm
              defaultExpand={false}
              showSearch={true}
              onSearch={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return modelQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              onReset={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return modelQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              showReset={true}
            >
              <Form.Item name="status">
                <Select
                  options={auditStatusEnum.value}
                  placeholder="请选择状态"
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item name="name">
                <Input placeholder="请输入规则集名称" />
              </Form.Item>
            </QueryForm>
            <Table
              pagination={{
                current: modelQuery.data?.curPage,
                total: modelQuery.data?.total,
                pageSizeOptions: ["10", "20", "30", "40"],
                onChange: async (...rest) => {
                  const result = [];
                  const actionsList = [
                    async (...rest) =>
                      Promise.resolve(
                        (async (page, pageSize) =>
                          rulesQuery.trigger({
                            params: {
                              curPage: page,
                              pageSize,
                            },
                          }))(...rest)
                      ),
                  ];
                  for (const action of actionsList) {
                    result.push(await action(...rest));
                  }
                  return result;
                },
                hideOnSinglePage: false,
                pageSize: 10,
                position: "bottom",
                showQuickJumper: false,
                showSizeChanger: false,
              }}
              expandRowByClick={false}
              actionColumnPosition="right"
              columns={[
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "name",
                  valueType: "text",
                  width: 200,
                  fixed: "left",
                  title: "模型名称",
                  align: "left",
                  key: "name",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{record.statusName}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  statusColor: {
                    args: ["self", "record", "index"],
                    src: "{{statusMap.value[self] || 'geekblue'}}",
                    _$t_$: "function",
                  },
                  dataIndex: "status",
                  valueType: "status",
                  width: 140,
                  title: "审核状态",
                  align: "left",
                  key: "age",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  dataIndex: "operator",
                  valueType: "text",
                  width: 140,
                  title: "申请人",
                  align: "left",
                  key: "address",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "operatorTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "申请时间",
                  align: "left",
                  ellipsis: true,
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "auditUser",
                  valueType: "text",
                  width: 140,
                  title: "审批人",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "auditTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "审批时间",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "appName",
                  valueType: "text",
                  width: 160,
                  title: "所属渠道",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}kg",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "ops",
                  valueType: "custom",
                  width: 120,
                  fixed: "right",
                  title: "操作",
                  align: "left",
                  render: {
                    args: ["self", "record", "index"],
                    src: "tableHandle",
                    _$t_$: "schema",
                    props: {
                      auditRecord: "{{auditRecord}}",
                      visible: "{{auditRecord}}",
                      onView: "{{detailRecord.setValue}}",
                      visibleState: "{{auditRecord}}",
                      currentRecord: "{{record}}",
                      onAudit: "{{auditRecord.setValue}}",
                    },
                  },
                },
              ]}
              showHeader={true}
              defaultExpandAllRows={false}
              bordered={false}
              loading={modelQuery.isFetching}
              locale={{
                filterReset: "重置",
                emptyText: "暂无数据",
                filterConfirm: "确定",
              }}
              size="middle"
              actionColumnAlign="left"
              actionColumnFixed="right"
              actionColumnTitle="操作"
              actionColumnWidth={220}
              indentSize={15}
              dataSource={modelQuery.data?.contents}
              scrollX={1000}
              rowKey="uuid"
            />
          </Container>
        </Tabs.TabPane>
        <Tabs.TabPane tab="函数库" key="103">
          <Container
            waterMarkProps={{
              rotate: -22,
              gapX: 200,
              gapY: 100,
              textAlign: "center",
              fontSize: 14,
              fontStyle: "normal",
              content: ["墨方-低代码平台", "同盾科技"],
              fontWeight: "normal",
              fontColor: "rgba(0,0,0,.15)",
              zIndex: 9,
            }}
            style={{
              backgroundColor: "",
              paddingBottom: "16px",
              paddingRight: "20px",
              paddingTop: "16px",
              paddingLeft: "20px",
            }}
          >
            <QueryForm
              defaultExpand={false}
              showSearch={true}
              onSearch={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return funcQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              onReset={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return funcQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              showReset={true}
            >
              <Form.Item name="status">
                <Select
                  options={auditStatusEnum.value}
                  placeholder="请选择状态"
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item name="name">
                <Input placeholder="请输入规则集名称" />
              </Form.Item>
            </QueryForm>
            <Table
              pagination={{
                current: funcQuery.data?.curPage,
                total: funcQuery.data?.total,
                pageSizeOptions: ["10", "20", "30", "40"],
                onChange: async (...rest) => {
                  const result = [];
                  const actionsList = [
                    async (...rest) =>
                      Promise.resolve(
                        (async (page, pageSize) =>
                          rulesQuery.trigger({
                            params: {
                              curPage: page,
                              pageSize,
                            },
                          }))(...rest)
                      ),
                  ];
                  for (const action of actionsList) {
                    result.push(await action(...rest));
                  }
                  return result;
                },
                hideOnSinglePage: false,
                pageSize: 10,
                position: "bottom",
                showQuickJumper: false,
                showSizeChanger: false,
              }}
              expandRowByClick={false}
              actionColumnPosition="right"
              columns={[
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "name",
                  valueType: "text",
                  width: 200,
                  fixed: "left",
                  title: "函数库名称",
                  align: "left",
                  key: "name",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{record.statusName}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  statusColor: {
                    args: ["self", "record", "index"],
                    src: "{{statusMap.value[self] || 'geekblue'}}",
                    _$t_$: "function",
                  },
                  dataIndex: "status",
                  valueType: "status",
                  width: 140,
                  title: "审核状态",
                  align: "left",
                  key: "age",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  dataIndex: "operator",
                  valueType: "text",
                  width: 140,
                  title: "申请人",
                  align: "left",
                  key: "address",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "operatorTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "申请时间",
                  align: "left",
                  ellipsis: true,
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "auditUser",
                  valueType: "text",
                  width: 140,
                  title: "审批人",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "auditTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "审批时间",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "appName",
                  valueType: "text",
                  width: 160,
                  title: "所属渠道",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}kg",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "ops",
                  valueType: "custom",
                  width: 120,
                  fixed: "right",
                  title: "操作",
                  align: "left",
                  render: {
                    args: ["self", "record", "index"],
                    src: "tableHandle",
                    _$t_$: "schema",
                    props: {
                      auditRecord: "{{auditRecord}}",
                      visible: "{{auditRecord}}",
                      onView: "{{detailRecord.setValue}}",
                      visibleState: "{{auditRecord}}",
                      currentRecord: "{{record}}",
                      onAudit: "{{auditRecord.setValue}}",
                    },
                  },
                },
              ]}
              showHeader={true}
              defaultExpandAllRows={false}
              bordered={false}
              loading={funcQuery.isFetching}
              locale={{
                filterReset: "重置",
                emptyText: "暂无数据",
                filterConfirm: "确定",
              }}
              size="middle"
              actionColumnAlign="left"
              actionColumnFixed="right"
              actionColumnTitle="操作"
              actionColumnWidth={220}
              indentSize={15}
              dataSource={funcQuery.data?.contents}
              scrollX={1000}
              rowKey="uuid"
            />
          </Container>
        </Tabs.TabPane>
        <Tabs.TabPane tab="决策工具" key="104">
          <Container
            waterMarkProps={{
              rotate: -22,
              gapX: 200,
              gapY: 100,
              textAlign: "center",
              fontSize: 14,
              fontStyle: "normal",
              content: ["墨方-低代码平台", "同盾科技"],
              fontWeight: "normal",
              fontColor: "rgba(0,0,0,.15)",
              zIndex: 9,
            }}
            style={{
              backgroundColor: "",
              paddingBottom: "16px",
              paddingRight: "20px",
              paddingTop: "16px",
              paddingLeft: "20px",
            }}
          >
            <QueryForm
              defaultExpand={false}
              showSearch={true}
              onSearch={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return decisionQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              onReset={async (...rest) => {
                const result = [];
                const actionsList = [
                  async (...rest) =>
                    Promise.resolve(
                      ((...rest) => {
                        return decisionQuery.trigger({});
                      })(...rest)
                    ),
                ];
                for (const action of actionsList) {
                  result.push(await action(...rest));
                }
                return result;
              }}
              showReset={true}
            >
              <Form.Item name="status">
                <Select
                  options={auditStatusEnum.value}
                  placeholder="请选择状态"
                  allowClear={true}
                />
              </Form.Item>
              <Form.Item name="name">
                <Input placeholder="请输入规则集名称" />
              </Form.Item>
            </QueryForm>
            <Table
              pagination={{
                current: decisionQuery.data?.curPage,
                total: decisionQuery.data?.total,
                pageSizeOptions: ["10", "20", "30", "40"],
                onChange: async (...rest) => {
                  const result = [];
                  const actionsList = [
                    async (...rest) =>
                      Promise.resolve(
                        (async (page, pageSize) =>
                          rulesQuery.trigger({
                            params: {
                              curPage: page,
                              pageSize,
                            },
                          }))(...rest)
                      ),
                  ];
                  for (const action of actionsList) {
                    result.push(await action(...rest));
                  }
                  return result;
                },
                hideOnSinglePage: false,
                pageSize: 10,
                position: "bottom",
                showQuickJumper: false,
                showSizeChanger: false,
              }}
              expandRowByClick={false}
              actionColumnPosition="right"
              columns={[
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "name",
                  valueType: "text",
                  width: 200,
                  fixed: "left",
                  title: "决策工具名称",
                  align: "left",
                  key: "name",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{record.statusName}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  statusColor: {
                    args: ["self", "record", "index"],
                    src: "{{statusMap.value[self] || 'geekblue'}}",
                    _$t_$: "function",
                  },
                  dataIndex: "status",
                  valueType: "status",
                  width: 140,
                  title: "审核状态",
                  align: "left",
                  key: "age",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  statusTitleColor: false,
                  dataIndex: "operator",
                  valueType: "text",
                  width: 140,
                  title: "申请人",
                  align: "left",
                  key: "address",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "operatorTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "申请时间",
                  align: "left",
                  ellipsis: true,
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "auditUser",
                  valueType: "text",
                  width: 140,
                  title: "审批人",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
                  dataIndex: "auditTime",
                  valueType: "dateTime",
                  width: 200,
                  title: "审批时间",
                  align: "left",
                },
                {
                  formatter: {
                    args: ["self", "record", "index"],
                    src: "{{self}}",
                    _$t_$: "function",
                  },
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "appName",
                  valueType: "text",
                  width: 160,
                  title: "所属渠道",
                  align: "left",
                },
                {
                  sortDirections: ["ascend", "descend"],
                  dataIndex: "ops",
                  valueType: "custom",
                  width: 120,
                  fixed: "right",
                  title: "操作",
                  align: "left",
                  render: {
                    args: ["self", "record", "index"],
                    src: "tableHandle",
                    _$t_$: "schema",
                    props: {
                      auditRecord: "{{auditRecord}}",
                      visible: "{{auditRecord}}",
                      onView: "{{detailRecord.setValue}}",
                      visibleState: "{{auditRecord}}",
                      currentRecord: "{{record}}",
                      onAudit: "{{auditRecord.setValue}}",
                    },
                  },
                },
              ]}
              showHeader={true}
              defaultExpandAllRows={false}
              bordered={false}
              loading={decisionQuery.isFetching}
              locale={{
                filterReset: "重置",
                emptyText: "暂无数据",
                filterConfirm: "确定",
              }}
              size="middle"
              actionColumnAlign="left"
              actionColumnFixed="right"
              actionColumnTitle="操作"
              actionColumnWidth={220}
              indentSize={15}
              dataSource={decisionQuery.data?.contents}
              scrollX={1000}
              rowKey="uuid"
            />
          </Container>
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};
