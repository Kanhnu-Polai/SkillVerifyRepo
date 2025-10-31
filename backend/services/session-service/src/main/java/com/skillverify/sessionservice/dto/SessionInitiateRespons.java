package com.skillverify.sessionservice.dto;

import com.skillverify.sessionservice.contant.SessionStatusEnum;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SessionInitiateRespons {
	private String sessionId;
	private SessionStatusEnum status;

}
