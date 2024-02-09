
export const getChartMax = (data: number[]) => {
    return Math.max(...data) - 20;
};

export const getChartYOffset = (data: number[]) => {
    const minValue = Math.min(...data);
    return Math.ceil((minValue-20) / 10) * 10;
}

export const getChartSpacing = (data: number[], parentWidth: number) => {
    return parentWidth / data.length;
};