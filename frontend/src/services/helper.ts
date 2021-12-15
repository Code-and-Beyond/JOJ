export const handleOffset = (date: string) => {
    let d = new Date(date);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    return d;
};
