package com.skillverify.sessionservice.service;

import com.skillverify.sessionservice.dto.InitiateDto;
import com.skillverify.sessionservice.dto.SessionInitiateRespons;

public interface SessionService {
	
	SessionInitiateRespons initiateSession(InitiateDto initiateDto);

}
