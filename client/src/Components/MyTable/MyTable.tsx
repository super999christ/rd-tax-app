//  External Dependencies
import { useState, useEffect } from 'react';
import Moment from 'react-moment';

//  Internal Dependencies
import { SERVER_URL } from '../../consts';

import { store } from '../../store/store';
import { uploadFile } from '../../store/projectSlice';
import { useAppDispatch } from '../../store/store';

import { MyTableProps } from './MyTable.types';
import { ExpenseTypes } from '../Global.types';
import { MyTableContainer } from './MyTableContainer.styled';

import MyInput from '../MyInput/MyInput';
import PDFUploader from '../PDFUploader/PDFUploader';

import { Edit, Trash, Create, Confirm, Cancel } from '../../assets/svgs';

function MyTable({ expenses, isEditing, onChangeExpenses }: MyTableProps) {
  const dispatch = useAppDispatch();
  const [isCreating, setCreating] = useState(false);
  const [editingData, setEditingData] = useState<ExpenseTypes>({
    _id: '',
    amount: '0',
    isQualified: false,
    attachment: '',
  });
  const [datas, setDatas] = useState(expenses);
  const [file, setFile] = useState<File | undefined>();
  const editingProjectId = store.getState().project.Project._id;

  useEffect(() => {
    setCreating(false);
    setEditingData({
      _id: '',
      amount: '0',
      isQualified: false,
      attachment: '',
    });
  }, [editingProjectId]);

  //  Click Create button on Table
  const onCreateExpense = () => {
    setFile(undefined);
    setCreating(!isCreating);
    setEditingData({
      _id: `creating`,
      amount: '0',
      isQualified: false,
      attachment: '',
    });
  };

  //  Click the Cancel button on Table
  const onCancelEdit = () => {
    setEditingData({
      _id: '',
      amount: '0',
      isQualified: false,
      attachment: '',
    });
    setCreating(false);
  };

  //  Click the Confirm button on Table
  const onConfirmEdit = async () => {
    let newDatas;
    const fileId = await (await dispatch(uploadFile(file))).payload;

    if (editingData._id === 'creating') {
      //  If it is Creating stage
      const newData = {
        ...editingData,
        _id: `created: ${Math.random()}`,
        attachment: fileId,
      };
      newDatas = [newData, ...datas];
    } else {
      //  If it is Editing stage
      const newData = { ...editingData, attachment: fileId };
      newDatas = datas.map((item) => {
        if (item._id === newData._id) return newData;
        return item;
      });
    }
    onChangeExpenses(newDatas);
    setDatas(newDatas);
    setEditingData({
      _id: '',
      amount: '0',
      isQualified: false,
      attachment: '',
    });
    setCreating(false);
  };

  //  Click the Edit button on Table
  const onEditExpense = (selItem: ExpenseTypes) => {
    if (editingData._id !== '') {
      //  Check the Editing or Creating Progress
      if (
        window.confirm(`Another editing is in progress.\nDo you ignore it?`)
      ) {
        setFile(undefined);
        setEditingData(selItem);
        setCreating(false);
      }
    } else {
      setFile(undefined);
      setEditingData(selItem);
    }
  };

  //  Click the Delete button on Table
  const onDeleteExpense = (selItem: ExpenseTypes) => {
    if (window.confirm('Are you sure?')) {
      const newData = datas.filter((item, index) => {
        if (selItem._id !== item._id) return item;
        return false;
      });
      setDatas(newData);
    }
  };

  //  Click the ViewFile button on Table
  const onViewFile = async (fileId: string) => {
    window.open(`${SERVER_URL}/viewDocument?docId=${fileId}`);
  };

  //  Handles the changes of Amount of expenses
  const setAmount = (value: string) => {
    const newData = { ...editingData, amount: value };
    setEditingData(newData);
  };

  //  Handles the changes of isQualified of expenses
  const setQualified = (value: boolean) => {
    const newData = { ...editingData, isQualified: value };
    setEditingData(newData);
  };

  //  Handles the changes of attachment of expenses
  const setAttachment = (value: File | undefined) => {
    setFile(value);
  };

  const content = datas.map((item, index) => {
    return (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td>
          <Moment date={item.createdAt} format="YYYY/MM/DD hh:mm:ss" />
        </td>
        <td>
          {item._id === editingData._id ? (
            <MyInput
              value={editingData?.amount}
              type="number"
              placeholder="Amount"
              onChange={setAmount}
            />
          ) : (
            item.amount
          )}
        </td>
        <td>
          {item._id === editingData._id ? (
            <input
              type="checkbox"
              checked={editingData?.isQualified}
              onChange={(e) => setQualified(e.target.checked)}
            />
          ) : item.isQualified === true ? (
            'Qualified'
          ) : (
            'Not Qualified'
          )}
        </td>
        {item._id === editingData._id ? (
          <td>
            <PDFUploader fileName={item.attachment} setFile={setAttachment} />
          </td>
        ) : (
          <td>
            {item.attachment ? (
              <button
                className="btn btn-sm btn-info"
                onClick={(e) => onViewFile(item.attachment)}
              >
                ViewFile
              </button>
            ) : (
              'No Attached Files'
            )}
          </td>
        )}
        {isEditing ? (
          item._id === editingData._id ? (
            <td className="buttonPad">
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => onConfirmEdit()}
              >
                <img src={Confirm} alt="" />
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => onCancelEdit()}
              >
                <img src={Cancel} alt="" />
              </button>
            </td>
          ) : (
            <td className="buttonPad">
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => onEditExpense(item)}
              >
                <img src={Edit} alt="" />
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => onDeleteExpense(item)}
              >
                <img src={Trash} alt="" />
              </button>
            </td>
          )
        ) : null}
      </tr>
    );
  });
  return (
    <MyTableContainer>
      <thead>
        <tr>
          <th>No</th>
          <th>Created Date/Time</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Attachment</th>
          {isEditing ? (
            <th>
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => onCreateExpense()}
              >
                <img src={Create} alt="" />
              </button>
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {isCreating ? (
          <tr key="creating">
            <td>-</td>
            <td>
              <Moment date="" format="YYYY/MM/DD hh:mm:ss" />
            </td>
            <td>
              <MyInput
                value={editingData?.amount}
                type="number"
                placeholder="Amount"
                onChange={setAmount}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={editingData?.isQualified}
                onChange={(e) => setQualified(e.target.checked)}
              />
            </td>
            <td>
              <PDFUploader
                fileName={editingData.attachment}
                setFile={setAttachment}
              />
            </td>
            <td className="buttonPad">
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => onConfirmEdit()}
              >
                <img src={Confirm} alt="" />
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => onCancelEdit()}
              >
                <img src={Cancel} alt="" />
              </button>
            </td>
          </tr>
        ) : null}
        {content}
      </tbody>
    </MyTableContainer>
  );
}

export default MyTable;
