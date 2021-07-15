import React, { useState, useEffect } from "react";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../task/taskstyle.css";
var _ = require("lodash");

const SubmitTasks = () => {
  const initialState = () => Number(window.localStorage.getItem("count") || 1);
  const [count, setCount] = useState(initialState);
  const [InputTask, UpdateIntoForm] = useState([]);
  const [Search, ShowFilterSearch] = useState([]);
  const [selecttasks, setSelectTask] = useState([]);

  function onSubmitInput(event) {
    event.preventDefault();
    const getElements = event.target.elements;
    for (const input of getElements) {
      setCount(count + 1);
      let tempInputTask = InputTask;
      tempInputTask.push({ tasks: input.value, count: count, status: "doing" });
      UpdateIntoForm([...tempInputTask]);
    }
    localStorage.setItem("task", JSON.stringify(InputTask));
    console.log(InputTask);
  }
  useEffect(() => window.localStorage.setItem("count", count), [count]);
  useEffect(() => {
    if (localStorage !== null) {
      console.log("dfhnkdh");
      let InputTasks = JSON.parse(localStorage.getItem("task"));
      UpdateIntoForm(InputTasks);
    }
  }, []);

  const OutputSearch = (event) => {
    event.preventDefault();
    const getValue = event.target.value;
    let tempSearchs = Search;
    tempSearchs = _.filter(InputTask, function (obj) {
      return obj.tasks === getValue;
    });

    ShowFilterSearch(tempSearchs);
    // console.log(Searchs);
  };

  const RemoveTask = (countToRemove) => {
    _.remove(InputTask, function (obj) {
      return obj.count === countToRemove;
    });
    UpdateIntoForm([...InputTask]);
    localStorage.setItem("task", JSON.stringify(InputTask));
    console.log(InputTask);
  };
  useEffect(() => {
    if (localStorage !== null) {
      let outputRemove = JSON.parse(localStorage.getItem("task"));
      UpdateIntoForm(outputRemove);
    }
  }, []);

  const selectTask = (event) => {
    let getStatuseCheckbox = event.target.checked;

    let nameTask = event.target.name;

    let valueTask = event.target.value;

    if (getStatuseCheckbox === true) {
      _.remove(InputTask, function (obj) {
        return obj.tasks === nameTask;
      });
      let datainput = { tasks: nameTask, count: valueTask, status: "done" };
      let tempTask = InputTask;
      tempTask.push(datainput);
      UpdateIntoForm(...tempTask);
      // UpdateIntoForm((prevToDoList) => {
      //     const newToDoList = [...prevToDoList, datainput];
      //
      //     return newToDoList;
      // });
      localStorage.setItem("tasks", JSON.stringify(InputTask));
    }
    if (getStatuseCheckbox === false) {
      _.remove(InputTask, function (obj) {
        return obj.tasks === nameTask;
      });

      let datainput = { tasks: nameTask, count: valueTask, status: "doing" };
      // UpdateIntoForm((prevToDoList) => {
      //     const newToDoList = [...prevToDoList, datainput];
      //     localStorage.setItem("tasks", JSON.stringify(InputTask));
      //     return newToDoList;
      // });
      let tempTask = InputTask;
      tempTask.push(datainput);
      UpdateIntoForm(...tempTask);
      localStorage.setItem("tasks", JSON.stringify(InputTask));
      console.log(InputTask);
    }
    //localStorage.setItem("task", JSON.stringify(InputTask));
  };
  useEffect(() => {
    if (localStorage !== null) {
      let outputselectsubmitesd = JSON.parse(localStorage.getItem("task"));
      UpdateIntoForm(outputselectsubmitesd);
    }
  }, []);

  const selecttaskssubmited = (countCheckBoxTask) => {
    let arrayaboutSelectTask = _.remove(selecttasks, function (counts) {
      return counts === countCheckBoxTask;
    });
    if (arrayaboutSelectTask.length === 0) {
      let tempSelectTask = selecttasks;
      tempSelectTask.push(countCheckBoxTask);
      setSelectTask(tempSelectTask);
      //    setSelectTask((prevToDoList) => {
      //     const newToDoList = [...prevToDoList, countCheckBoxTask];
      //     return newToDoList;
      // });
    }
    localStorage.setItem("selecttasks", JSON.stringify(selecttasks));
  };
  useEffect(() => {
    if (localStorage !== null) {
      let outputSelect = JSON.parse(localStorage.getItem("selecttasks"));
      setSelectTask(outputSelect);
    }
  }, []);

  const delettaskssubmited = () => {
    let deletedTasks = _.remove(InputTask, function (obj) {
      return selecttasks.findIndex((select) => select === obj.count) > -1;
    });

    UpdateIntoForm(InputTask);
    localStorage.setItem("task", JSON.stringify(InputTask));
  };
  useEffect(() => {
    if (localStorage !== null) {
      let InputTasks = JSON.parse(localStorage.getItem("task"));
      UpdateIntoForm(InputTasks);
    }
  }, []);

  const selectTotalCheckBox = () => {
    let mapped_array = _.map(InputTask, function (obj) {
      return obj.count;
    });
    setSelectTask(mapped_array);
    let getTotalchecked = document.getElementsByClassName("SelectTask");

    for (const check of getTotalchecked) {
      check.checked = true;
    }
  };

  const showTotalTask = () => {
    let outputTotaltask = _.filter(InputTask, function (obj) {
      return obj.status === "doing" || obj.status === "done";
    });
    UpdateIntoForm(outputTotaltask);
    console.log(outputTotaltask);
  };

  const showTaskDone = () => {
    let outputtaskdones = _.filter(InputTask, function (obj) {
      return obj.status === "done";
    });

    UpdateIntoForm(outputtaskdones);
    console.log(InputTask);
  };
  const showTaskDoning = () => {
    let outputTaskDoning = _.filter(InputTask, function (obj) {
      return obj.status === "doing";
    });

    console.log(outputTaskDoning);
    UpdateIntoForm(outputTaskDoning);
    console.log(InputTask);
  };

  const RemoveTaskSearch = (countToRemove) => {
    _.remove(Search, function (obj) {
      return obj.count === countToRemove;
    });
    ShowFilterSearch([...Search]);
  };

  return (
    <>
      <div className="backimg ">
        <div className="backgroundstyle">
          <div className="container-fluid">
            <div className="row">
              <div className=" col-12 ">
                <div className="row m-5">
                  <div className="offset-md-3 col-md-6  p-md-5">
                    <form className="font text color" onSubmit={onSubmitInput}>
                      <div className="form-group">
                        <label htmlFor="count" style={{ color: "black" }}>
                          <h5>
                            <b>تسک خود را ثبت کنید</b>
                          </h5>
                        </label>
                        <input
                          type="text"
                          name="tasks"
                          className="form-control text border"
                          id="count"
                          placeholder="ثبت تسک"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {InputTask.length !== 0 ? (
          <>
            <div className="margin">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-2 offset-md-1 col-12">
                        <button
                          type="button"
                          className="btn btn-block btn-secondary aligntextbutton font my-2"
                          onClick={delettaskssubmited}
                        >
                          حذف انتخاب شده‌ها
                        </button>
                      </div>
                      <div className="col-md-4 my-3 col-12">
                        <form>
                          <input
                            type="text"
                            name="search"
                            placeholder="جستجو"
                            className="font text"
                            onInput={OutputSearch}
                            style={{ width: "100%" }}
                          ></input>
                        </form>
                      </div>
                      <div className="col-md-2 col-12">
                        <div className="dropdown">
                          <button
                            className="btn btn-block btn-secondary my-2 dropdown-toggle font aligntextbutton"
                            type="button"
                            id="dropdownMenu2"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            فیلتر
                          </button>
                          <div
                            className="dropdown-menu text"
                            aria-labelledby="dropdownMenu2"
                          >
                            <button
                              className="dropdown-item font text"
                              type="button"
                              onClick={showTaskDone}
                            >
                              تسک‌های انجام‌شده
                            </button>
                            <button
                              className="dropdown-item font text"
                              type="button"
                              onClick={showTaskDoning}
                            >
                              تسک‌های درحال انجام
                            </button>
                            <button
                              className="dropdown-item font text"
                              type="button"
                              onClick={showTotalTask}
                            >
                              تمام تسک‌ها
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 col-12">
                        <button
                          type="button"
                          className="btn btn-block btn-secondary aligntextbutton font my-2"
                          onClick={selectTotalCheckBox}
                        >
                          انتخاب همه
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {Search.length !== 0 ? (
          <>
            {Search.map((item2, index) => {
              return (
                <>
                  <div
                    className="container alert alert-dismissible btnborderrediose alert-secondary fade show"
                    role="alert"
                  >
                    <h4 className="font text pt-6">نتیجه با موفقیت یافت شد</h4>
                    <div className="row my-4">
                      <div className="col-12 ">
                        <table className="table borderbtndelet table-borderless">
                          <tbody>
                            <tr key={index}>
                              <td
                                className="aligntextbutton "
                                style={{ width: "28%" }}
                              >
                                <button
                                  type="button"
                                  className="btn-lg borderbtndelet font"
                                  name="id"
                                  onClick={() =>
                                    RemoveTaskSearch(Search[index].count)
                                  }
                                >
                                  <i className="btn fas fa-trash-alt"></i>
                                </button>
                              </td>
                              <td style={{ width: "35%" }}>
                                <h5
                                  className="text pt-2 font"
                                  style={{ color: "black" }}
                                >
                                  {item2.status === "done" ? (
                                    <>
                                      <strike>{item2.tasks}</strike>
                                    </>
                                  ) : (
                                    <>{item2.tasks}</>
                                  )}
                                </h5>
                              </td>
                              <td style={{ width: "15%" }}>
                                <input
                                  className="form-check-input Select"
                                  type="checkbox"
                                  value={InputTask[index].count}
                                  name={InputTask[index].tasks}
                                  defaultChecked={item2.status === "done"}
                                  onClick={selectTask}
                                  style={{ width: "100px", height: "30px" }}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-check-input SelectTask"
                                  type="checkbox"
                                  name="examplecheckbox"
                                  defaultChecked={
                                    selecttasks.findIndex(
                                      (e) => e === Search[index].count
                                    ) > -1
                                  }
                                  onClick={() =>
                                    selecttaskssubmited(InputTask[index].count)
                                  }
                                  style={{ width: "100px", height: "30px" }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : null}
        <div className="container ">
          <div className="row">
            <div className=" col-12 offset-md-1 col-md-10  mb-3 ">
              <table className="table borderbtndelet table-striped table-borderless backshowsetitem">
                <tbody>
                      {InputTask.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td
                                className="aligntextbutton "
                                style={{ width: "25%" }}
                              >
                                <button
                                  type="button"
                                  className="btn-lg borderbtndelet font"
                                  name="id"
                                  onClick={() =>
                                    RemoveTask(InputTask[index].count)
                                  }
                                >
                                  <i className="btn fas fa-trash-alt"></i>
                                </button>
                              </td>
                              <td style={{ width: "40%" }}>
                                <h5
                                  className="text pt-2 font"
                                  style={{ color: "black" }}
                                >
                                  {item.status === "done" ? (
                                    <>
                                      <strike>{item.tasks}</strike>
                                    </>
                                  ) : (
                                    <>{item.tasks}</>
                                  )}
                                </h5>
                              </td>
                              <td style={{ width: "20%" }}>
                                <input
                                  className="form-check-input Select"
                                  type="checkbox"
                                  value={InputTask[index].count}
                                  name={InputTask[index].tasks}
                                  defaultChecked={item.status === "done"}
                                  onClick={selectTask}
                                  style={{ width: "100px", height: "30px" }}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-check-input SelectTask"
                                  value={InputTask[index].count}
                                  type="checkbox"
                                  name="examplecheckbox"
                                  defaultChecked={
                                    selecttasks.findIndex(
                                      (e) => e === InputTask[index].count
                                    ) > -1
                                  }
                                  onClick={() =>
                                    selecttaskssubmited(InputTask[index].count)
                                  }
                                  style={{ width: "100px", height: "30px" }}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubmitTasks;
