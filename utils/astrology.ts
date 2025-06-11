export const getSignFromDate = (dt: number | string | Date) => {
    const signs: Record<string, number[]> = {
      Aries: [953596800000, 956102400000], //Aries: March 21st - April 19th
      Taurus: [956188800000, 958780800000], //Taurus: April 20th - May 20th
      Gemini: [958867200000, 961459200000], //Gemini: May 21st - June 20th
      Cancer: [961545600000, 964224000000], //Cancer: June 21st - July 22nd
      Leo: [964310400000, 966902400000], //Leo: July 23rd - August 22nd
      Virgo: [966988800000, 969580800000], //Virgo: August 23rd - September 22nd
      Libra: [969667200000, 972172800000], //Libra: September 23rd - October 22nd
      Scorpio: [972259200000, 974764800000], //Scorpio: October 23rd - November 21st
      Sagittarius: [974851200000, 977356800000], //Sagittarius: November 22nd - December 21st
      Capricorn: [977443200000, 979862400000], //Capricorn: December 22nd - January 19th
      Aquarius: [979948800000, 982454400000], //Aquarius: January 20th - February 18th
      Pisces: [982540800000, 985046400000], //Pisces: February 19th - March 20th
    };
  
    const time = new Date(dt);
    time.setFullYear(2000);
    let sign = "";
    Object.keys(signs).map((s, ind) => {
      if (signs[s][0] <= time.getTime() && signs[s][1] >= time.getTime()) {
        sign = s;
      }
    });
  
    if (sign === "") {
      time.setFullYear(2001);
      Object.keys(signs).map((s, ind) => {
        if (signs[s][0] <= time.getTime() && signs[s][1] >= time.getTime()) {
          sign = s;
        }
      });
    }
  
    return sign;
  };
  
  export const getSignPeriod = (sign: string) => {
    const signs: Record<string, number[]> = {
      aries: [953596800000, 956102400000], //Aries: March 21st - April 19th
      taurus: [956188800000, 958780800000], //Taurus: April 20th - May 20th
      gemini: [958867200000, 961459200000], //Gemini: May 21st - June 20th
      cancer: [961545600000, 964224000000], //Cancer: June 21st - July 22nd
      leo: [964310400000, 966902400000], //Leo: July 23rd - August 22nd
      virgo: [966988800000, 969580800000], //Virgo: August 23rd - September 22nd
      libra: [969667200000, 972172800000], //Libra: September 23rd - October 22nd
      scorpio: [972259200000, 974764800000], //Scorpio: October 23rd - November 21st
      sagittarius: [974851200000, 977356800000], //Sagittarius: November 22nd - December 21st
      capricorn: [977443200000, 979862400000], //Capricorn: December 22nd - January 19th
      aquarius: [979948800000, 982454400000], //Aquarius: January 20th - February 18th
      pisces: [982540800000, 985046400000], //Pisces: February 19th - March 20th
    };
  
    const from = new Date(signs[sign.toLowerCase()][0]);
    const to = new Date(signs[sign.toLowerCase()][1]);
    const now = new Date();
    from.setFullYear(now.getFullYear());
    to.setFullYear(now.getFullYear());
    return [from, to];
  };
  