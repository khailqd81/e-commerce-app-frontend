import React, { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2'
import axios from "axios";
ChartJS.register(...registerables);
function Statistic() {
    const [statistic, setStatistic] = useState([]);
    const [staField, setStaField] = useState("sold");
    const [chartType, setChartType] = useState("Bar");
    useEffect(() => {
        async function getStatistic() {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/products/statistic`, {
                params: {
                    staField
                }
            });
            if (response.status === 200) {
                if (staField === "pro_sold") {
                    const products = (response.data).sort((a, b) => b.sold - a.sold);
                    let newSta = [products[0], products[1], products[2]];
                    const otherTotal = (products.slice(3, products.length)).reduce((total, item) => {
                        return total + item.sold;
                    }, 0);

                    newSta.push({
                        product_name: "Còn lại",
                        sold: otherTotal
                    })
                    setStatistic(newSta);
                } else {
                    setStatistic(response.data);
                }
            }
            else {
                setStatistic([]);

            }
        }
        getStatistic();
    }, [staField])

    const handleChange = (field) => {
        if (field === "pro_sold") {
            setChartType('Pie')
        }
        else {
            setChartType('Bar')
        }
        setStaField(field);
    }

    const data = {
        labels: statistic.map((item) => {
            if (item.category_name) {
                return item.category_name;
            }
            return item.product_name;
        }),
        datasets: [
            {
                label: "Số lượng sản phẩm (chiếc)",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850"
                ],
                data: statistic.map(item => {
                    if (item.total_sold) {
                        return item.total_sold
                    }
                    return item.sold
                })
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top"
            },
            title: {
                display: true,
                fontSize: 20,
                text: staField === "sold"
                    ? 'Số lượng sản phẩm đã bán theo loại của cửa hàng.'
                    : staField === "quantity"
                        ? "Số lượng sản phẩm còn lại theo loại của cửa hàng."
                        : "Số lượng sản phẩm đã bán của cửa hàng."
            },
        }

    }
    return (
        <div className="flex flex-col max-w-screen-lg mx-auto my-8 px-4 md:px-0">
            <div className="text-lg font-bold text-green-500 border border-green-500 max-w-[140px] text-center rounded py-2 px-4 mb-8">Thống kê</div>
            <div className="flex flex-col md:flex-row justify-center mb-8">
                <div
                    className={staField === "sold"
                        ? "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer text-green-500 border border-green-500"
                        : "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => handleChange("sold")}
                >
                    Sản phẩm đã bán theo loại
                </div>
                <div
                    className={staField === "quantity"
                        ? "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer text-green-500 border border-green-500"
                        : "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => handleChange("quantity")}
                >
                    Sản phẩm còn lại theo loại
                </div>
                <div
                    className={staField === "pro_sold"
                        ? "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer text-green-500 border border-green-500"
                        : "py-2 px-4 border mb-2 md:mb-0 md:mr-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
                    }
                    onClick={() => handleChange("pro_sold")}
                >
                    Sản phẩm đã bán theo từng sản phẩm
                </div>
            </div>

            {
                (() => {
                    switch (chartType) {
                        case "Bar":
                            return <Bar
                                className="max-w-[600px] max-h-[600px] self-center"
                                data={data}
                                options={options} />;

                        case "Pie":
                            return <Pie
                                className="max-w-[600px] max-h-[600px] self-center"
                                data={data}
                                options={options}
                            />;
                        default:
                            return <Bar
                                className="max-w-[600px] max-h-[600px] self-center"
                                data={data}
                                options={options}
                            />;
                    }
                })()
            }

        </div>
    )
}

export default Statistic;