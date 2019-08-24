function addLog(service: string, text: string) {
  console.log(`${text} : ${service} - ${new Date()}`);
}

export { addLog };
