
function resolveFrame(f, delay) { 
  if (typeof delay === 'undefined') delay = 6000;
  return new Promise(resolve => {
    setTimeout(() => {
      f();
      resolve(null)
    }, delay);
  });
}

async function intro() {
  await resolveFrame(intro_f1, 1000);
  await resolveFrame(pauseFrame, 12000);
  await resolveFrame(intro_f2, 6000);
  await resolveFrame(intro_f2_addText, 6000);
  await resolveFrame(intro_reset, 15000);
  await resolveFrame(pauseFrame, 5000);
}

async function frame_m1(){
  await resolveFrame(m1_f1, 2000);
  await resolveFrame(m1_f2, 20000); 
  await resolveFrame(pauseFrame, 17000);
}

async function frame_m2(){
  await resolveFrame(m2_f1, 2000);  
  await resolveFrame(pauseFrame, 30000);
}

async function frame_m3(){
  await resolveFrame(m3_f1, 2000);
  await resolveFrame(pauseFrame, 30000);
}

async function frame_m4(){
  await resolveFrame(m4_f1, 2000);
  await resolveFrame(pauseFrame, 30000);
}

async function frame_m5(){
  await resolveFrame(m5, 2000);
  await resolveFrame(pauseFrame, 20000);
}

async function runStory() {
  await intro();
  await frame_m1(); 
  await frame_m2();  
  await frame_m3();  
  await frame_m4();
  await frame_m5();
  runStory() 
}


